// staging
const fivetranStripeStgBalanceTransaction = require("./includes/staging/balance_transaction");
const fivetranStripeStgCard = require("./includes/staging/card");
const fivetranStripeStgCharge = require("./includes/staging/charge");
const fivetranStripeStgCustomer = require("./includes/staging/customer");
const fivetranStripeStgFee = require("./includes/staging/fee");
const fivetranStripeStgInvoiceLineItem = require("./includes/staging/invoice_line_item");
const fivetranStripeStgInvoice = require("./includes/staging/invoice");
const fivetranStripeStgPaymentIntent = require("./includes/staging/payment_intent");
const fivetranStripeStgPaymentMethodCard = require("./includes/staging/payment_method_card");
const fivetranStripeStgPaymentMethod = require("./includes/staging/payment_method");
const fivetranStripeStgPayout = require("./includes/staging/payout");
const fivetranStripeStgPlan = require("./includes/staging/plan");
const fivetranStripeStgRefund = require("./includes/staging/refund");
const fivetranStripeStgSubscription = require("./includes/staging/subscription");
// outputs
const fivetranStripeBalanceTransactionJoined = require("./includes/balance_transaction_joined");
const fivetranStripeBalanceTransaction = require("./includes/balance_transaction");
const fivetranStripeCustomerOverview = require("./includes/customer_overview");
const fivetranStripeDailyOverview = require("./includes/daily_overview");
const fivetranStripeIncompleteCharges = require("./includes/incomplete_charges");
const fivetranStripeInvoiceLineItems = require("./includes/invoice_line_items");
const fivetranStripeMonthyOverview = require("./includes/monthly_overview");
const fivetranStripeQuarterlyOverview = require("./includes/quarterly_overview");
const fivetranStripeSubscriptionDetails = require("./includes/subscription_details");
const fivetranStripeSubscriptionLineItems = require("./includes/subscription_line_items");
const fivetranStripeWeeklyOverview = require("./includes/weekly_overview");

module.exports = (params) => {

  params = {
    // set defaults for parameters
    fivetranStripeSchema: "fivetran_log",
    stagingTablePrefix: "stg_",
    usingSubscriptions: false,       
    usingInvoices: false,
    usingPaymentMethod: false,
    ...params
  };

  let balance_transaction, card, charge, customer, fee, invoice_line_item, invoice, payment_intent, payment_method_card, payment_method, payout, plan, refund, subscription;

  balance_transaction = declare({
    ...params.defaultConfig,
    database: params.fivetranStripeDatabase,
    schema: params.fivetranStripeSchema,
    name: "balance_transaction"
  });

  card = declare({
    ...params.defaultConfig,
    database: params.fivetranStripeDatabase,
    schema: params.fivetranStripeSchema,
    name: "card"
  });

  charge = declare({
    ...params.defaultConfig,
    database: params.fivetranStripeDatabase,
    schema: params.fivetranStripeSchema,
    name: "charge"
  });

  customer = declare({
    ...params.defaultConfig,
    database: params.fivetranStripeDatabase,
    schema: params.fivetranStripeSchema,
    name: "customer"
  });

  fee = declare({
    ...params.defaultConfig,
    database: params.fivetranStripeDatabase,
    schema: params.fivetranStripeSchema,
    name: "fee"
  });

  invoice_line_item = declare({
    ...params.defaultConfig,
    database: params.fivetranStripeDatabase,
    schema: params.fivetranStripeSchema,
    name: "invoice_line_item"
  });

  invoice = declare({
    ...params.defaultConfig,
    database: params.fivetranStripeDatabase,
    schema: params.fivetranStripeSchema,
    name: "invoice"
  });

  payment_intent = declare({
    ...params.defaultConfig,
    database: params.fivetranStripeDatabase,
    schema: params.fivetranStripeSchema,
    name: "payment_intent"
  });

  payment_method_card = declare({
    ...params.defaultConfig,
    database: params.fivetranStripeDatabase,
    schema: params.fivetranStripeSchema,
    name: "payment_method_card"
  });

  payment_method = declare({
    ...params.defaultConfig,
    database: params.fivetranStripeDatabase,
    schema: params.fivetranStripeSchema,
    name: "payment_method"
  });

  payout = declare({
    ...params.defaultConfig,
    database: params.fivetranStripeDatabase,
    schema: params.fivetranStripeSchema,
    name: "payout"
  });

  plan = declare({
    ...params.defaultConfig,
    database: params.fivetranStripeDatabase,
    schema: params.fivetranStripeSchema,
    name: "plan"
  });

  refund = declare({
    ...params.defaultConfig,
    database: params.fivetranStripeDatabase,
    schema: params.fivetranStripeSchema,
    name: "refund"
  });

  subscription = declare({
    ...params.defaultConfig,
    database: params.fivetranStripeDatabase,
    schema: params.fivetranStripeSchema,
    name: "subscription"
  });

  // Publish and return datasets.
  let result = {
    balance_transaction: fivetranStripeStgBalanceTransaction(params),
    card: fivetranStripeStgCard(params),
    charge: fivetranStripeStgCharge(params),
    customer: fivetranStripeStgCustomer(params),
    fee: fivetranStripeStgFee(params),
    invoice_line_item: fivetranStripeStgInvoiceLineItem(params),
    invoice: fivetranStripeStgInvoice(params),
    payment_intent: fivetranStripeStgPaymentIntent(params),
    payment_method_card: fivetranStripeStgPaymentMethodCard(params),
    payment_method: fivetranStripeStgPaymentMethod(params),
    payout: fivetranStripeStgPayout(params),
    plan: fivetranStripeStgPlan(params),
    refund: fivetranStripeStgRefund(params),
    subscription: fivetranStripeStgSubscription(params),
    balance_transaction_joined: fivetranStripeBalanceTransactionJoined(params),
    balance_transaction: fivetranStripeBalanceTransaction(params),
    customer_overview: fivetranStripeCustomerOverview(params),
    daily_overview: fivetranStripeDailyOverview(params),
    incomplete_charges: fivetranStripeIncompleteCharges(params),
    invoice_line_items: fivetranStripeInvoiceLineItems(params),
    monthly_overview: fivetranStripeMonthyOverview(params),
    quarterly_overview: fivetranStripeQuarterlyOverview(params),
    subscription_details: fivetranStripeSubscriptionDetails(params),
    subscription_line_items: fivetranStripeSubscriptionLineItems(params),
    weekly_overview: fivetranStripeWeeklyOverview(params)
  };

  return result;
}
