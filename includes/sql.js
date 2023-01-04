const getDialect = () => {
  const dataformWarehouse = global.dataform.projectConfig.warehouse;
  if (!dataformWarehouse) {
    return "standard";
  }
  return {
    bigquery: "standard",
    redshift: "redshift",
    postgres: "postgres",
    snowflake: "snowflake",
    sqldatawarehouse: "mssql",
  }[dataformWarehouse];
};

const asTimestamp = (castableToTimestamp) => {
  return `cast(${castableToTimestamp} as timestamp)`;
};

const timestampTruncate = (timestamp, timestampUnit) => {
  const dialect = getDialect();
  if (dialect === "snowflake") {
    return `date_trunc(${timestampUnit}, ${timestamp})`;
  }
  if (dialect === "redshift") {
    return `date_trunc('${timestampUnit}', ${timestamp})`;
  }
  return `timestamp_trunc(${timestamp}, ${timestampUnit})`;
};

const timestampAdd = (timestamp, units, datePart) => {
  const dialect = getDialect();
  if (dialect === "standard") {
    return `timestamp_add(${timestamp}, interval ${units} ${datePart})`;
  }
  if (dialect === "snowflake") {
    return `timestampadd(${datePart}, ${units}, ${timestamp})`;
  }
  return `dateadd(${datePart}, ${units}, ${timestamp})`;
};

const currentUTC = () => {
  const dialect = getDialect();
  if (dialect === "redshift") {
    return "current_timestamp::timestamp";
  }
  if (dialect === "snowflake") {
    return "convert_timezone('UTC', current_timestamp())::timestamp";
  }
  return "current_timestamp()";
};

module.exports = {
  asTimestamp,
  timestampTruncate,
  timestampAdd,
  currentUTC,
};
