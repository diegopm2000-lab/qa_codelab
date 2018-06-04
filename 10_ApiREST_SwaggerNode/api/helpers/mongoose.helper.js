// mongoose.helper.js

const mongoose = require('mongoose');

const configHelper = require('../helpers/config.helper');
const log = require('../helpers/log.helper');

console.log('Se pone a cargar el puto mongoose helper!!!');

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
// CONNECTION EVENTS
// //////////////////////////////////////////////////////////////////////////////

// When successfully connected
mongoose.connection.on('connected', () => {
  log.info(`${MODULE_NAME} Event on connected--> Mongoose default connection open to ${dbURI}`);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  log.info(`${MODULE_NAME} Event on error--> Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  log.info(`${MODULE_NAME} Event on disconnected --> Mongoose default connection disconnected`);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    log.info(`${MODULE_NAME} Event on Node Process End --> Mongoose default connection disconnected through app termination`);
    process.exit(0);
  });
});

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function connect() {
  if (!connected) {
    const { mongodatabase } = configHelper.getConfig();
    dbURI = `${mongodatabase.mongoURL}/${mongodatabase.database}`;
    await mongoose.connect(dbURI);
    connected = true;
    log.info(`${MODULE_NAME} ${connect.name} --> New connection established!`);
  } else {
    log.info(`${MODULE_NAME} ${connect.name} --> existing connection!`);
  }
}

module.exports = {
  connect,
};
