module.exports = (params) => {

  return publish(params.stagingTablePrefix + params.tablePrefix + "plan", {
  ...params.defaultConfig,
  schema: params.stagingSchema,
  disabled: !params.usingSubscriptions
  }).query(ctx => `

select
  id as plan_id,
  active as is_active,
  amount,
  currency,
  ${global.dataform.projectConfig.warehouse === "bigquery" ? `"interval"` : `interval`} as plan_interval,
  interval_count,
  nickname,
  product_id
from ${ctx.ref(params.fivetranStripeSchema, 'plan')}

`)
}