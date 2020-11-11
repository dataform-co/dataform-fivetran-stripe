module.exports = (params) => {

  return publish(params.tablePrefix + "subscription_details", {
  ...params.defaultConfig,
  disabled: !(params.usingInvoices && params.usingSubscriptions)
  }).query(ctx => `

line_items_groups as (
select
  invoice.invoice_id,
  invoice.amount_due,
  invoice.amount_paid,
  invoice.amount_remaining,
  invoice.created_at,
  max(invoice_line_item.subscription_id) as subscription_id,
  sum(invoice_line_item.amount) as total_item_amount,
  count(distinct invoice_line_item.unique_id) as number_line_items
from ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'invoice_line_item')} as invoice_line_item
  join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'invoice')}  as invoice on invoice.invoice_id = invoice_line_item.invoice_id
  group by 1, 2, 3, 4, 5
), 

grouped_by_subcription as (
select
  subscription_id,
  count(distinct invoice_id) as number_invoices_generated,
  sum(amount_due) as total_amount_billed,
  sum(amount_paid) as total_amount_paid,
  sum(amount_remaining) total_amount_remaining,
  max(created_at) as most_recent_invoice_created_at,
  avg(amount_due) as average_invoice_amount,
  avg(total_item_amount) as average_line_item_amount,
  avg(number_line_items) as avg_num_invoice_items
from line_items_groups
  group by 1
)


select
  subscription.subscription_id,
  subscription.customer_id,
  customer.description as customer_description,
  customer.email as customer_email,
  subscription.status,
  subscription.start_date,
  subscription.ended_at,
  subscription.billing,
  subscription.billing_cycle_anchor,
  subscription.canceled_at,
  subscription.created_at,
  subscription.current_period_start,
  subscription.current_period_end,
  subscription.days_until_due,
  subscription.is_cancel_at_period_end,
  subscription.cancel_at,
  number_invoices_generated,
  total_amount_billed,
  total_amount_paid,
  total_amount_remaining,
  most_recent_invoice_created_at,
  average_invoice_amount,
  average_line_item_amount,
  avg_num_invoice_items
from ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'subscription')} as subscription
left join grouped_by_subcription on subscription.subscription_id = grouped_by_subcription.subscription_id
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'customer')} as customer on subscription.customer_id = customer.customer_id
`)
}