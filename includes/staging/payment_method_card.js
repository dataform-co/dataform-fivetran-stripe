module.exports = (params) => {

  return publish(params.stagingTablePrefix + params.tablePrefix + "payment_method_card", {
  ...params.defaultConfig,
  schema: params.stagingSchema,
  disabled: !params.usingPaymentMethod
  }).query(ctx => `

select 
  payment_method_id,
  brand,
  funding
from ${ctx.ref(params.fivetranStripeSchema, 'payment_method_card')}

`)
}