module.exports = (params) => {

  return publish(params.stagingTablePrefix + params.tablePrefix + "fee", {
  ...params.defaultConfig,
  schema: params.stagingSchema,
  }).query(ctx => `

select 
  balance_transaction_id,
  amount,
  application,
  currency,
  description,
  type
from ${ctx.ref(params.fivetranStripeSchema, 'fee')}

`)
}