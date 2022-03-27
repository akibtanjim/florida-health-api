const loggerName = process.env.LOGGER_NAME;
const env = process.env.APP_ENV || "local";
const appPort = process.env.APP_PORT;
const logLevel = process.env.LOG_LEVEL;
const host = process.env.HOST || "localhost";
const appSecret = process.env.APP_SECRET;

const variables = {
  appPort,
  env,
  loggerName,
  logLevel,
  host,
  appSecret
};

module.exports = variables;
