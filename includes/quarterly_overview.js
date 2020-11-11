const sql = require("@dataform/sql")();

module.exports = (params) => {

  return publish(params.tablePrefix + "quarterly_overview", {
  ...params.defaultConfig
  }).query(ctx => `
with daily_overview as (

select *
from ${ctx.ref(params.defaultConfig.schema, params.tablePrefix + 'daily_overview')} 

)

select
${sql.timestamps.truncate('quarter', sql.asTimestamp('date'))} as quarter,
  sum(total_sales) as total_sales,
  sum(total_refunds) as total_refunds,
  sum(total_adjustments) as total_adjustments,
  sum(total_other_transactions) as total_other_transactions,
  sum(total_gross_transaction_amount) as total_gross_transaction_amount,
  sum(total_net_tranactions) as total_net_tranactions,
  sum(total_payout_fees) as total_payout_fees,
  sum(total_gross_payout_amount) as total_gross_payout_amount,
  sum(daily_net_activity) as quarterly_net_activity,
  sum(total_sales_count) as total_sales_count,
  sum(total_payouts_count) as total_payouts_count,
  sum(total_adjustments_count) as total_adjustments_count,
  sum(total_failed_charge_count) as total_failed_charge_count,
  sum(total_failed_charge_amount) as total_failed_charge_amount
from daily_overview
group by 1
order by 1 desc
`)
}