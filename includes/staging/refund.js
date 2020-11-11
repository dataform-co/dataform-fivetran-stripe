module.exports = (params) => {

  return publish(params.stagingTablePrefix + params.tablePrefix + "refund", {
  ...params.defaultConfig,
  schema: params.stagingSchema
  }).query(ctx => `

select 
  id as refund_id,
  amount,
  balance_transaction_id,
  charge_id,
  created as created_at,
  currency,
  description,
  reason,
  receipt_number,
  status
from ${ctx.ref(params.fivetranStripeSchema, 'refund')}

`)
}