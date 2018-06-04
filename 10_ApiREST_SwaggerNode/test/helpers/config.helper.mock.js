// config.helper.mock.js

/* eslint-disable */

const expectations = require('../expectations/expectations');

function setConfig(config) {

}

function getConfig() {

}

function loadConfigFromYmlFile(file) {
  console.log('Entrando en loadConfigFromYmlFile del config.helper.mock');
  return new Promise((resolve) => {
    console.log(`config: ${JSON.stringify(expectations.config)}`);
    resolve(expectations.config);
  })
}

module.exports = {
  setConfig,
  getConfig,
  loadConfigFromYmlFile,
};
