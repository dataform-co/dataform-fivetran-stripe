module.exports = (params) => {

  return publish(params.stagingTablePrefix + params.tablePrefix + "charge", {
  ...params.defaultConfig,
  schema: params.stagingSchema,
  }).query(ctx => `

select 
  id as charge_id, 
  amount,
  amount_refunded,
  application_fee_amount,
  balance_transaction_id,
  captured as is_captured,
  card_id,
  created as created_at,
  customer_id,
  currency,
  description,
  failure_code,
  failure_message,
  paid as is_paid,
  payment_intent_id,
  receipt_email,
  receipt_number,
  refunded as is_refunded,
  status,
  invoice_id
from ${ctx.ref(params.fivetranStripeSchema, 'charge')}

`)
}