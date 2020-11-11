module.exports = (params) => {

  return publish(params.stagingTablePrefix + params.tablePrefix + "payment_method", {
  ...params.defaultConfig,
  schema: params.stagingSchema,
  disabled: !params.usingPaymentMethod
  }).query(ctx => `

select 
  id as payment_method_id,
  created as created_at,
  customer_id,
  type
from ${ctx.ref(params.fivetranStripeSchema, 'payment_method')}

`)
}