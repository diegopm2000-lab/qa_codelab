// app.js

console.log('----> empezando a cargar el modulo app.js');

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const healthcheck = require('express-healthcheck');
// Security libraries
const helmet = require('helmet');
// const hsts = require('hsts'); // Only to force https
const frameguard = require('frameguard'); // Only to force same origin for frames

const log = require('./api/helpers/log.helper');
const configHelper = require('./api/helpers/config.helper');
const mongooseHelper = require('./api/helpers/mongoose.helper');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

// Default Port
const defaultPort = 8080;
// Path needed to obtain the config file
const configPath = process.env.CONFIG_PATH;
// const configHost = process.env.CONFIG_HOST;
const configPort = process.env.PORT;

const config = {
  appRoot: __dirname, // required config
};

// Application Server started using Express
let server;

console.log('modulo app.js cargado con EXITO!');

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function initSecurity() {
  // 1. Use helmet framework security. View in npm helmet the issues activated by default
  app.use(helmet());

  // 2. Force same origin for frames
  app.use(frameguard({
    action: 'sameorigin',
  }));

  // 3. Force https always
  // app.use(hsts({
  //   maxAge: 31536000, // 365 days in seconds
  // }));
}

function init() {
  initSecurity();
  configHelper.loadConfigFromYmlFile(configPath)
  // configHelper.loadConfigFromHost(configHost, configPath)
    .then(() => mongooseHelper.connect())
    .then((result) => {
      try {
        configHelper.setConfig(result);
        log.info(`Set trace level to: ${result.logLevel}`);
        log.setTraceLevel(result.logLevel);

        SwaggerExpress.create(config, (err, swaggerExpress) => {
          if (err) {
            log.error(`Failed to start App, error: ${err.stack}`);
            throw err;
          }
         
          const port = module.exports.configPort || defaultPort;
          
          if (!module.parent) {
            module.exports.server = app.listen(port);
          }
          // Healthcheck
          // app.use('/healthcheck', healthcheck({
          //   healthy() {
          //     return { everything: 'is ok' };
          //   },
          // }));

          // Install middleware
          swaggerExpress.register(app);

          log.info(`App Server started at port: ${port}`);
          console.log('App cargada con EXITO!');
        });
      } catch (err) {
        log.error(err);
        throw err;
      }
    })
    .catch((err) => {
      log.error(`Failed to start App Server, error: ${err.stack}`);
      throw err;
    });
}

function stop() {
  console.log('parando el servidor...');
  module.exports.server.close(() => { log.richInfoApp('App Server stopped'); });
}

// //////////////////////////////////////////////////////////////////////////////
// APPLICATION START
// //////////////////////////////////////////////////////////////////////////////

init();

module.exports = {
  defaultPort, // for testing
  configPort, // for testing
  server, // for testing
  init, // for testing
  stop, // for testing
  app, // for testing
};
