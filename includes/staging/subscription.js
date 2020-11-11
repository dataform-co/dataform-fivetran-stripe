module.exports = (params) => {

  return publish(params.stagingTablePrefix + params.tablePrefix + "subscription", {
  ...params.defaultConfig,
  schema: params.stagingSchema,
  disabled: !params.usingSubscriptions
  }).query(ctx => `

select
  id as subscription_id,
  status,
  billing,
  billing_cycle_anchor,
  cancel_at,
  cancel_at_period_end as is_cancel_at_period_end,
  canceled_at,
  created as created_at,
  current_period_start,
  current_period_end,
  customer_id,
  days_until_due,
  start_date,
  ended_at
from ${ctx.ref(params.fivetranStripeSchema, 'subscription')}

`)
}