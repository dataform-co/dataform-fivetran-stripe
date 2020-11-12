module.exports = (params) => {

  return publish(params.tablePrefix + "invoice_line_items", {
  ...params.defaultConfig,
  disabled: !params.usingInvoices
  }).query(ctx => `

select 
  invoice.invoice_id,
  invoice.number,
  invoice.created_at as invoice_created_at,
  invoice.status,
  invoice.due_date,
  invoice.amount_due,
  invoice.subtotal,
  invoice.tax,
  invoice.total,
  invoice.amount_paid,
  invoice.amount_remaining,
  invoice.attempt_count,
  invoice.description as invoice_memo,
  invoice_line_item.invoice_line_item_id as invoice_line_item_id,
  invoice_line_item.description as line_item_desc,
  invoice_line_item.amount as line_item_amount,
  invoice_line_item.quantity,
  invoice_line_item.period_start,
  invoice_line_item.period_end,
  charge.balance_transaction_id,
  charge.amount as charge_amount, 
  charge.status as charge_status,
  charge.created_at as charge_created_at,
  customer.description as customer_description,
  customer.email as customer_email,
  customer.customer_id as customer_id
  ${ctx.when(params.usingSubscriptions, `,
  subscription.subscription_id,
  subscription.billing as subcription_billing,
  subscription.start_date as subscription_start_date,
  subscription.ended_at as subscription_ended_at,
  plan.plan_id,
  plan.is_active as plan_is_active,
  plan.amount as plan_amount,
  plan.plan_interval as plan_interval,
  plan.interval_count as plan_interval_count,
  plan.nickname as plan_nickname,
  plan.product_id as plan_product_id
  `)}
from ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'invoice')}  as invoice
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'charge')}  as charge on charge.charge_id = invoice.charge_id
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'invoice_line_item')} as invoice_line_item on invoice.invoice_id = invoice_line_item.invoice_id
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'customer')}  as customer on invoice.customer_id = customer.customer_id
${ctx.when(params.usingSubscriptions, `
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'subscription')}  as subscription on invoice_line_item.subscription_id = subscription.subscription_id
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'plan')} as plan on invoice_line_item.plan_id = plan.plan_id
`)}
`)
}