// config.helper.js

const readYaml = require('read-yaml');

const log = require('../helpers/log.helper');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

// Module name
const MODULE_NAME = 'Config Helper';

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

// Configuration Storage
let myConfig = {};

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

// Sets the config
function setConfig(config) {
  myConfig = config;
}

// Gets the config
function getConfig() {
  return myConfig;
}

// Loads the configuration from yml file
function loadConfigFromYmlFile(file) {
  return new Promise((resolve, reject) => {
    try {
      log.info(`${MODULE_NAME} ${loadConfigFromYmlFile.name} (IN) --> file:${file}`);

      readYaml(file, (error, data) => {
        if (!error) {
          log.info(`${MODULE_NAME} ${loadConfigFromYmlFile.name} (OUT) --> ${JSON.stringify(data)}`);
          console.log(`resolviendo fichero con datos: ${JSON.stringify(data)}`);
          resolve(data);
        } else {
          log.error(`${MODULE_NAME} ${loadConfigFromYmlFile.name} (ERROR) --> error: ${error.message}`);
          reject(error);
        }
      });
    } catch (error) {
      log.error(`${MODULE_NAME} ${loadConfigFromYmlFile.name} (ERROR) --> error: ${error.message}`);
      reject(error);
    }
  });
}

module.exports = {
  setConfig,
  getConfig,
  loadConfigFromYmlFile,
};
