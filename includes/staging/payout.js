module.exports = (params) => {

  return publish(params.stagingTablePrefix + params.tablePrefix + "payout", {
  ...params.defaultConfig,
  schema: params.stagingSchema
  }).query(ctx => `

select 
  id as payout_id,
  amount,
  arrival_date,
  automatic as is_automatic,
  balance_transaction_id,
  created as created_at,
  currency,
  description,
  method,
  source_type,
  status,
  type
from ${ctx.ref(params.stripeSchema, 'payout')}

`)
}