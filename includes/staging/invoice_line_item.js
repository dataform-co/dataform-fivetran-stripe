module.exports = (params) => {

  return publish(params.stagingTablePrefix + params.tablePrefix + "invoice_line_item", {
  ...params.defaultConfig,
  schema: params.stagingSchema,
  disabled: !params.usingInvoices
  }).query(ctx => `

select
  id as invoice_line_item_id,
  invoice_id,
  amount,
  currency,
  description,
  discountable as is_discountable,
  plan_id,
  proration,
  quantity,
  subscription_id,
  subscription_item_id,
  type,
  unique_id,
  period_start,
  period_end
from ${ctx.ref(params.fivetranStripeSchema, 'invoice_line_item')}
where id not like 'sub%' -- ids starting with 'sub' are temporary and are replaced by permanent ids starting with 'sli' 

`)
}