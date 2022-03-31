const loggerName = process.env.LOGGER_NAME;
const env = process.env.APP_ENV || "local";
const appPort = process.env.APP_PORT;
const logLevel = process.env.LOG_LEVEL;
const host = process.env.HOST || "localhost";
const bucketName = process.env.AWS_BUCKET_NAME;
const apiRateLimitInterval = process.env.API_RATE_LIMIT_INTERVAL_IN_MIN;
const apiMaxRequestLimit = process.env.API_MAX_REQUEST_LIMIT;
const cacheMaxAge = process.env.CACHE_MAX_AGE_IN_SEC;
const stateMapper = {
  florida: "FL",
};

const variables = {
  appPort,
  env,
  loggerName,
  logLevel,
  host,
  stateMapper,
  bucketName,
  apiRateLimitInterval,
  apiMaxRequestLimit,
  cacheMaxAge,
};

module.exports = variables;
