module.exports = (params) => {

  return publish(params.stagingTablePrefix + params.tablePrefix + "payment_intent", {
  ...params.defaultConfig,
  schema: params.stagingSchema
  }).query(ctx => `

select 
  id as payment_intent_id,
  amount,
  amount_capturable,
  amount_received,
  application,
  application_fee_amount,
  canceled_at,
  cancellation_reason,
  capture_method,
  confirmation_method,
  created as created_at,
  currency,
  customer_id,
  description,
  payment_method_id,
  receipt_email,
  statement_descriptor,
  status
from ${ctx.ref(params.fivetranStripeSchema, 'payment_intent')}

`)
}