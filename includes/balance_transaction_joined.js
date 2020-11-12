const sql = require("@dataform/sql")();

module.exports = (params) => {

  return publish(params.tablePrefix + "balance_transaction_joined", {
  ...params.defaultConfig
  }).query(ctx => `

select 
  balance_transaction.balance_transaction_id,
  balance_transaction.created_at,
  balance_transaction.available_on,
  balance_transaction.currency,
  balance_transaction.amount,
  balance_transaction.fee,
  balance_transaction.net,
  balance_transaction.type,
  case
    when balance_transaction.type in ('charge', 'payment') then 'charge'
    when balance_transaction.type in ('refund', 'payment_refund') then 'refund'
    when balance_transaction.type in ('payout_cancel', 'payout_failure') then 'payout_reversal'
    when balance_transaction.type in ('transfer', 'recipient_transfer') then 'transfer'
    when balance_transaction.type in ('transfer_cancel', 'transfer_failure', 'recipient_transfer_cancel', 'recipient_transfer_failure') then 'transfer_reversal'
    else balance_transaction.type
  end as reporting_category,
  balance_transaction.source,
  balance_transaction.description,
  case when balance_transaction.type = 'charge' then charge.amount end as customer_facing_amount, 
  case when balance_transaction.type = 'charge' then charge.currency end as customer_facing_currency,
  ${sql.timestamps.add("balance_transaction.available_on", 1, "day")} as effective_at,
  coalesce(charge.customer_id, refund_charge.customer_id) as customer_id,
  charge.receipt_email,
  customer.description as customer_description,
  charge.charge_id,
  charge.payment_intent_id,
  charge.created_at as charge_created_at,
  card.brand as card_brand,
  card.funding as card_funding,
  card.country as card_country,
  payout.payout_id,
  payout.arrival_date as payout_expeted_arrival_date,
  payout.status as payout_status,
  payout.type as payout_type,
  payout.description as payout_description
  ${ctx.when(params.usingPaymentMethod, `,
  payment_method.type as payment_method_type,
  payment_method_card.brand as payment_method_brand,
  payment_method_card.funding as payment_method_funding,
  refund.reason as refund_reason
  `)}
from  ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'balance_transaction') } as balance_transaction
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'charge') } as charge on charge.balance_transaction_id = balance_transaction.balance_transaction_id
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'customer') } as customer on charge.customer_id = customer.customer_id
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'payment_intent') } as payment_intent on charge.payment_intent_id = payment_intent.payment_intent_id
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'card') } as card on charge.card_id = card.card_id
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'payout') } as payout on payout.balance_transaction_id = balance_transaction.balance_transaction_id
${ctx.when(params.usingPaymentMethod, `
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'payment_method') } as payment_method on payment_intent.payment_method_id = payment_method.payment_method_id
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'payment_method_card') } as payment_method_card on payment_method_card.payment_method_id = payment_method.payment_method_id
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'refund') } as refund on refund.balance_transaction_id = balance_transaction.balance_transaction_id
`)}
left join ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'charge') } as refund_charge on refund.charge_id = refund_charge.charge_id


`)
}