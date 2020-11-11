module.exports = (params) => {

  return publish(params.tablePrefix + "incomplete_charges", {
  ...params.defaultConfig
  }).query(ctx => `

select 
  created_at,
  customer_id,
  amount
from ${ctx.ref(params.stagingSchema, params.stagingTablePrefix + params.tablePrefix + 'charge')}
where not is_captured
`)
}