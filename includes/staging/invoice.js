module.exports = (params) => {

  return publish(params.stagingTablePrefix + params.tablePrefix + "invoice", {
  ...params.defaultConfig,
  schema: params.stagingSchema,
  disabled: !params.usingInvoices
  }).query(ctx => `

select
  id as invoice_id,
  amount_due,
  amount_paid,
  amount_remaining,
  attempt_count,
  auto_advance,
  billing_reason,
  charge_id,
  created as created_at,
  currency,
  customer_id,
  description,
  due_date,
  number,
  paid as is_paid,
  receipt_number,
  status,
  subtotal,
  tax,
  tax_percent,
  total
from ${ctx.ref(params.stripeSchema, 'invoice')}
where not coalesce(is_deleted, false)

`)
}