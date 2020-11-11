module.exports = (params) => {

  return publish(params.stagingTablePrefix + params.tablePrefix + "balance_transaction", {
  ...params.defaultConfig,
  schema: params.stagingSchema,
  }).query(ctx => `

select 
  id as balance_transaction_id,
  amount,
  available_on,
  created as created_at,
  currency,
  description,
  exchange_rate,
  fee,
  net,
  source,
  status,
  type
from ${ctx.ref(params.fivetranStripeSchema, 'balance_transaction')}

`)
}