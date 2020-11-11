module.exports = (params) => {

  return publish(params.tablePrefix + "balance_transactions", {
  ...params.defaultConfig
  }).query(ctx => `
  with balance_transaction_joined as (

select *
from ${ctx.ref(params.defaultConfig.schema, params.tablePrefix + 'balance_transaction_joined')} 

)

{% if var('using_payment_method', True) %}

select 
${params.usingPaymentMethod ? `
  *` : `
  balance_transaction_id,
  created_at,
  available_on,
  currency,
  amount,
  fee,
  net,
  type,
  reporting_category,
  source,
  description,
  customer_facing_amount,
  customer_facing_currency,
  effective_at,
  customer_id,
  receipt_email,
  customer_description,
  charge_id,
  payment_intent_id,
  charge_created_at,
  card_brand,
  card_funding,
  card_country,
  payout_id,
  payout_expeted_arrival_date,
  payout_status,
  payout_type,
  payout_description` }

from ${ctx.ref(params.defaultConfig.schema, params.tablePrefix + 'balance_transaction_joined')} 

`)
}