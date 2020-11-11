module.exports = (params) => {

  return publish(params.stagingTablePrefix + params.tablePrefix + "card", {
  ...params.defaultConfig,
  schema: params.stagingSchema,
  }).query(ctx => `

select 
  id as card_id,
  brand,
  country,
  created as created_at,
  customer_id,
  name,
  recipient,
  funding
from ${ctx.ref(params.fivetranStripeSchema, 'card')}

`)
}