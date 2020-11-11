const fivetran_stripe = require("../");

const models = fivetran_stripe({
  fivetranStripeSchema: "stripe_fivetran",
  fivetranStripeDatabase: "dataform-corp",
  tablePrefix: "",
  stagingTablePrefix: "",
  stagingSchema: "fivetran_stripe_package_stg",
  usingSubscriptions: true,
  usingInvoices: true,
  usingPaymentMethod: true,
  defaultConfig: {
    schema: "fivetran_stripe_package",
    tags: ["fivetran_stripe"],
    type: "table"
  },
});
