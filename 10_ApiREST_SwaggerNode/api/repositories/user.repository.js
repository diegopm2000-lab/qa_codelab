// users.repository.js

const log = require('../helpers/log.helper');
const mongoose = require('mongoose');
const shortid = require('shortid');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[User Mongo Repository]';

// //////////////////////////////////////////////////////////////////////////////
// SCHEMA
// //////////////////////////////////////////////////////////////////////////////

const User = mongoose.model('User');

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function getUsers(filter) {
  log.info(`${MODULE_NAME} ${getUsers.name} (IN) -> filter: ${JSON.stringify(filter)}`);

  mongoose.set('debug', true);
  // const result = await User.find(params);
  const result = await User.find(filter);

  log.info(`${MODULE_NAME} ${getUsers.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getUserById(idIN) {
  log.info(`${MODULE_NAME} ${getUserById.name} (IN) -> id: ${JSON.stringify(idIN)}`);

  const result = await User.findOne({ id: idIN });

  log.info(`${MODULE_NAME} ${getUserById.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getUserByName(nameIN) {
  log.info(`${MODULE_NAME} ${getUserByName.name} (IN) -> name: ${JSON.stringify(nameIN)}`);

  const result = await User.findOne({ name: nameIN });

  log.info(`${MODULE_NAME} ${getUserByName.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function createUser(UserIN) {
  log.info(`${MODULE_NAME} ${createUser.name} (IN) -> User: ${JSON.stringify(UserIN)}`);

  const result = await User.create({
    id: shortid.generate(),
    name: UserIN.name,
    surname: UserIN.surname,
    loginname: UserIN.loginname,
    password: UserIN.password,
  });

  log.info(`${MODULE_NAME} ${getUserByName.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function updateUser(UserIN) {
  log.info(`${MODULE_NAME} ${updateUser.name} (IN) -> User: ${JSON.stringify(UserIN)}`);

  const resultUpdate = await User.where({ id: UserIN.id }).update({
    name: UserIN.name,
    surname: UserIN.surname,
    loginname: UserIN.loginname,
    password: UserIN.password,
  });
  log.info(`${MODULE_NAME} ${updateUser.name} -> resultUpdate: ${JSON.stringify(resultUpdate)}`);
  const result = await getUserById(UserIN.id);

  log.info(`${MODULE_NAME} ${updateUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function deleteUser(idIN) {
  log.info(`${MODULE_NAME} ${deleteUser.name} (IN) -> id: ${JSON.stringify(idIN)}`);

  const resultDeletion = await User.deleteOne({ id: idIN });
  log.info(`${MODULE_NAME} ${deleteUser.name} -> resultDeletion: ${JSON.stringify(resultDeletion)}`);

  let result = false;
  if (resultDeletion.n === 1 && resultDeletion.ok === 1) {
    result = true;
  }

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
