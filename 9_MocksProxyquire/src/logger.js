// logger.js

const Log = require('log-color');

const log = new Log({ level: 'debug', color: true });

function debug(text) {
  log.debug(text);
}

function info(text) {
  log.info(text);
}

function error(text) {
  log.error(text);
}

module.exports = {
  debug,
  info,
  error,
};
