const loggerName = process.env.LOGGER_NAME;
const env = process.env.APP_ENV || "local";
const appPort = process.env.APP_PORT;
const logLevel = process.env.LOG_LEVEL;
const host = process.env.HOST || "localhost";
const bucketName = process.env.AWS_BUCKET_NAME;
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
};

module.exports = variables;
