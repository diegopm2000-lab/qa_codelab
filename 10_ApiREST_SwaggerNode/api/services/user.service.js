// user.service.js

const log = require('../helpers/log.helper');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

// Module Name
const MODULE_NAME = '[User Service]';

function getUsers(params) {
  log.info(`${MODULE_NAME} ${getUsers.name} (IN) -> params: ${JSON.stringify(params)}`);

  // const result = await userRepository.getUsers(params);
  const result = {};

  log.info(`${MODULE_NAME} ${getUsers.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

module.exports = {
  getUsers,
};
