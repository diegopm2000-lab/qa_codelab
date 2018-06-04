// user.service.js

const log = require('../helpers/log.helper');
const userRepository = require('../repositories/user.repository');

console.log('user.service cargado con EXITO!');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[User Service]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getUsers(filter) {
  console.log('Entrando en getUsers de user.service!');
  log.info(`${MODULE_NAME} ${getUsers.name} (IN) -> params: ${JSON.stringify(filter)}`);

  const result = await userRepository.getUsers(filter);

  log.info(`${MODULE_NAME} ${getUsers.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getUserById(id) {
  log.info(`${MODULE_NAME} ${getUserById.name} (IN) -> id: ${JSON.stringify(id)}`);

  const result = await userRepository.getUserById(id);

  log.info(`${MODULE_NAME} ${getUserById.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getUserByName(name) {
  log.info(`${MODULE_NAME} ${getUserByName.name} (IN) -> name: ${JSON.stringify(name)}`);

  const result = await userRepository.getUserByName(name);

  log.info(`${MODULE_NAME} ${getUserByName.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function createUser(userIN) {
  log.info(`${MODULE_NAME} ${createUser.name} (IN) -> userIN: ${JSON.stringify(userIN)}`);

  const result = await userRepository.createUser(userIN);

  log.info(`${MODULE_NAME} ${createUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function updateUser(userIN) {
  log.info(`${MODULE_NAME} ${updateUser.name} (IN) -> params: ${JSON.stringify(userIN)}`);

  const result = await userRepository.updateUser(userIN);

  log.info(`${MODULE_NAME} ${updateUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function deleteUser(id) {
  log.info(`${MODULE_NAME} ${deleteUser.name} (IN) -> id: ${JSON.stringify(id)}`);

  const result = await userRepository.deleteUser(id);

  log.info(`${MODULE_NAME} ${deleteUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
};
