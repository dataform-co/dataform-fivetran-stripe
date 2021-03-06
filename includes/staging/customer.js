module.exports = (params) => {

  return publish(params.stagingTablePrefix + params.tablePrefix + "customer", {
  ...params.defaultConfig,
  schema: params.stagingSchema,
  }).query(ctx => `

select 
  id as customer_id,
  account_balance,
  created as created_at,
  currency,
  default_card_id,
  delinquent as is_delinquent,
  description,
  email,
  shipping_address_city,
  shipping_address_country,
  shipping_address_line_1,
  shipping_address_line_2,
  shipping_address_postal_code,
  shipping_address_state,
  shipping_name,
  shipping_phone
from ${ctx.ref(params.fivetranStripeSchema, 'customer')}

`)
}