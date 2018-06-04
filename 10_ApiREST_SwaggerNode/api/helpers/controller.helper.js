// controller.helper.js

const log = require('./log.helper');

console.log('controller.helper cargado con EXITO!');

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function buildErrorLog(err) {
  let errorLog;
  if (err === undefined) {
    errorLog = 'Error not defined';
  } else if (err.stack !== undefined) {
    errorLog = err.stack;
  } else if (err.message !== undefined) {
    errorLog = err.message;
  } else {
    errorLog = JSON.stringify(err);
  }
  return errorLog;
}

function buildErrorResponse(nameController, methodName) {
  const jsonResultFailed = {
    error: {
      code: 500,
      message: 'Internal Server Error',
      description: `Internal Application Error in ${nameController}:${methodName}`,
    },
  };
  return jsonResultFailed;
}

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function handleErrorResponse(controllerName, methodName, err, res) {
  log.error(`${controllerName} ${methodName} ${buildErrorLog(err)}`);
  const jsonResultFailed = buildErrorResponse(controllerName, methodName);
  res.status(500).send(jsonResultFailed);
}

// //////////////////////////////////////////////////////////////////////////////
// MODULE EXPORTS
// //////////////////////////////////////////////////////////////////////////////

module.exports = {
  buildErrorLog, // for testing
  buildErrorResponse, // for testing

  handleErrorResponse,
};
