// user.controller.js

const log = require('../helpers/log.helper');
const controllerHelper = require('../helpers/controller.helper');
const messageHelper = require('../helpers/message.helper');
const userService = require('../services/user.service');

console.log('user.controller cargado con EXITO!');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[User Controller]';

// Error Messages
const USER_NOT_FOUND = 'User not found';
const USER_NOT_CREATED = 'User not created';
const USER_NOT_UPDATED = 'User not updated';

// Success Messages
const USER_DELETED_SUCCESSFULLY = 'User deleted successfully';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

function getUsers(req, res) {
  try {
    console.log('Entrando en getUsers de user.controller');
    const filter = {};
    // Receiving parameters
    const name = req.swagger.params.name.value;
    const surname = req.swagger.params.surname.value;
    const loginname = req.swagger.params.loginname.value;

    // Building filter
    if (name !== undefined) {
      filter.name = name;
    }
    if (surname !== undefined) {
      filter.surname = surname;
    }
    if (loginname !== undefined) {
      filter.loginname = loginname;
    }

    log.info(`${MODULE_NAME} ${getUsers.name} (IN) -> filter: ${filter}`);

    // Call to service
    console.log('antes de llamar a getUsers en user.controller');
    userService.getUsers(filter)
      .then((result) => {
        console.log(`Obtenemos antes de devolver el resultado: result: ${result}`);

        // Returning the result
        log.info(`${MODULE_NAME} ${getUsers.name} (OUT) -> result: ${JSON.stringify(result)}`);
        res.json(result);
      })
      .catch((error) => {
        controllerHelper.handleErrorResponse(MODULE_NAME, getUsers.name, error, res);
      });

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getUsers.name, error, res);
  }
}

async function getUserById(req, res) {
  try {
    // Receiving parameters
    const params = {
      id: req.swagger.params.id.value,
    };

    log.info(`${MODULE_NAME} ${getUserById.name} (IN) -> params: ${JSON.stringify(params)}`);

    // Call to service
    const result = await userService.getUserById(params.id);

    // Returning the result
    if (result !== undefined && result !== null) {
      log.info(`${MODULE_NAME} ${getUserById.name} (OUT) -> result: ${JSON.stringify(result)}`);
      res.json(result);
    } else {
      log.info(`${MODULE_NAME} ${getUserById.name} (OUT) -> result: ${USER_NOT_FOUND}`);
      res.status(404).json(messageHelper.buildMessage(USER_NOT_FOUND));
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getUsers.name, error, res);
  }
}

async function createUser(req, res) {
  try {
    // Receiving parameters
    const params = req.body;
    log.info(`${MODULE_NAME} ${createUser.name} (IN) -> params: ${JSON.stringify(params)}`);

    // Call to service
    const result = await userService.createUser(params);

    // Returning the result
    if (result !== undefined) {
      log.info(`${MODULE_NAME} ${createUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
      res.status(201).json(result);
    } else {
      log.info(`${MODULE_NAME} ${createUser.name} (OUT) -> result: ${USER_NOT_CREATED}`);
      res.status(409).json(messageHelper.buildMessage(USER_NOT_CREATED));
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, createUser.name, error, res);
  }
}

async function updateUser(req, res) {
  try {
    // Receiving parameters
    const params = {
      id: req.swagger.params.id.value,
    };
    Object.assign(params, req.body);
    log.info(`${MODULE_NAME} ${updateUser.name} (IN) -> params: ${JSON.stringify(params)}`);

    // Call to service
    const result = await userService.updateUser(params);

    // Returning the result
    if (result) {
      log.info(`${MODULE_NAME} ${updateUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
      res.status(201).json(result);
    } else {
      log.info(`${MODULE_NAME} ${updateUser.name} (OUT) -> result: ${USER_NOT_UPDATED}`);
      res.status(409).json(messageHelper.buildMessage(USER_NOT_UPDATED));
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, updateUser.name, error, res);
  }
}

async function deleteUser(req, res) {
  try {
    // Receiving parameters
    const params = {
      id: req.swagger.params.id.value,
    };
    log.info(`${MODULE_NAME} ${deleteUser.name} (IN) -> params: ${JSON.stringify(params)}`);

    // Call to service
    const result = await userService.deleteUser(params.id);

    // Returning the result
    if (result) {
      log.info(`${MODULE_NAME} ${deleteUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
      res.json(messageHelper.buildMessage(USER_DELETED_SUCCESSFULLY));
    } else {
      log.info(`${MODULE_NAME} ${deleteUser.name} (OUT) -> result: ${USER_NOT_FOUND}`);
      res.status(409).json(messageHelper.buildMessage(USER_NOT_FOUND));
    }
  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, deleteUser.name, error, res);
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
