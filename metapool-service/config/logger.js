const winston = require('winston');
const { logLevels, sentryDsn } = require('../config/vars');
const Sentry = require('@sentry/node');
const SentryWinston = require('winston-transport-sentry-node').default;

// define the custom settings for each transport (file, console)
const options = {
  file              : {
    level           : logLevels.file,
    filename        : `logs/app.log`,
    handleExceptions: true,
    json            : true,
    maxsize         : 5242880, // 5MB
    maxFiles        : 5,
    colorize        : false,
    format          : winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
  },
  console           : {
    level           : logLevels.console,
    handleExceptions: true,
    json            : false,
    colorize        : true,
    format          : winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
  },
};

const transports = [
  new winston.transports.File(options.file),
  new winston.transports.Console(options.console)
];

if (sentryDsn) {
  const sentry = new SentryWinston({
    sentry  : {
      dsn   : sentryDsn,
    },
    level   : logLevels.sentry
  });

  transports.push(sentry);
}

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports  : transports,
  exitOnError : false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};

module.exports = {
  logger: logger,
  sentry: Sentry
};
