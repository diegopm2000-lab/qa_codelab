// mongoose.helper.js

const mongoose = require('mongoose');

const configHelper = require('../helpers/config.helper');
const log = require('../helpers/log.helper');

// //////////////////////////////////////////////////////////////////////////////
// REGISTER MODELS
// //////////////////////////////////////////////////////////////////////////////

require('../repositories/user');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Mongoose Helper]';

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

let dbURI;
let connected = false;

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function connect() {
  return new Promise((resolve, reject) => {
    try {
      if (!connected) {
        const { mongodatabase } = configHelper.getConfig();
        dbURI = `${mongodatabase.mongoURL}/${mongodatabase.database}`;
        log.info(`${MODULE_NAME} ${connect.name} --> Trying to connect to mongodb`);
        mongoose.connect(dbURI, { useNewUrlParser: true });
        const db = mongoose.connection;

        db.on('error', (err) => {
          log.error(`${MODULE_NAME} ${connect.name} --> Error in connect: ${err.message}`);
          reject(err);
        });
        db.once('open', () => {
          resolve(true);
        });
      } else {
        log.info(`${MODULE_NAME} ${connect.name} --> Existing connection to mongodb`);
        resolve(true);
      }
    } catch (error) {
      log.error(`${MODULE_NAME} ${connect.name} --> Error in connect: ${error.message}`);
      reject(error);
    }
  });
}

// //////////////////////////////////////////////////////////////////////////////
// CONNECTION EVENTS
// //////////////////////////////////////////////////////////////////////////////

// When successfully connected
mongoose.connection.on('connected', () => {
  log.debug(`${MODULE_NAME} Event on connected --> Mongoose default connection open to ${dbURI}`);
  // console.log('MENSAJE CONNECTED');
  connected = true;
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  log.debug(`${MODULE_NAME} Event on error --> Mongoose default connection error: ${err}`);
  // console.log('MENSAJE ERROR ON CONECTION');
  connected = false;
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  log.debug(`${MODULE_NAME} Event on disconnected --> Mongoose default connection disconnected`);
  connected = false;
  // console.log('MENSAJE DISCONNECTED');
  setTimeout(connect, 5000);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    log.info(`${MODULE_NAME} Event on Node Process End --> Mongoose default connection disconnected through app termination`);
    // console.log('MENSAJE SIGINT');
    process.exit(0);
  });
});

module.exports = {
  connect,
};
