# dataform-fivetran-stripe

BETA package for transforming Stripe datasets managed by a Fivetran connector. An ERD of the source data is [here](https://docs.google.com/presentation/d/1nqPBWtH_h_8iVjF9-GselWhIyfLH7dgEk7P92s66eEc/edit).

TODO: description of what the packages does.

## Installation

Add the package to your `package.json` file in your Dataform project. You can find the most up to package version on the [releases page](https://github.com/dataform-co/dataform-fivetran-stripe/releases).

## Configure the package

Create a new JS file in your `definitions/` folder and create the Fivetran Stripe tables as in the following example.

By default, the package will look for source data in the `fivetran_stripe` schema. If this is not where your Fivetran connector writes Stripe data to, you can override it when calling the package:

```js
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

```

## Supported warehouses:
 - BigQuery
 - Snowflake
 - Redshift
