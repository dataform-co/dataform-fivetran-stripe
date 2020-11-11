module.exports = (params) => {

  return publish(params.tablePrefix + "subscription_line_items", {
  ...params.defaultConfig,
  disabled: !params.usingSubscriptions
  }).query(ctx => `

select 
  *
from 
  ${ctx.ref(params.defaultConfig.schema, params.tablePrefix + 'invoice_line_items')} 
where 
  subscription_id is not null

`)
}