// user.controller.js

const log = require('../helpers/log.helper');
const controllerHelper = require('../helpers/controller.helper');
const userService = require('../services/user.service');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[User Controller]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

function getUsers(req, res) {
  try {
    const params = {};
    // Receiving parameters
    // const params = {
    //   name: req.swagger.params.name.value,
    //   surname: req.swagger.params.surname.value,
    //   loginname: req.swagger.params.loginname.value,
    // };

    log.info(`${MODULE_NAME} ${getUsers.name} (IN) -> params: ${JSON.stringify(params)}`);

    // Call to service
    const result = userService.getUsers();

    log.info(`${MODULE_NAME} ${getUsers.name} (OUT) -> result: ${JSON.stringify(result)}`);

    // Returning the result
    res.json(result);
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getUsers.name, error, res);
  }
}

module.exports = {
  getUsers,
};
