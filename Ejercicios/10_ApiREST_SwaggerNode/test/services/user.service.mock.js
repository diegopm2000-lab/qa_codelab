// user.service.mock.js

/* eslint-disable no-unused-vars */

function getUsers(filters) {
  return Promise.resolve([]);
}

function getUserById(id) {
  return Promise.resolve({});
}

function getUserByName(name) {
  return Promise.resolve({});
}

function createUser(userIN) {
  return Promise.resolve({});
}

function updateUser(userIN) {
  return Promise.resolve({});
}

function deleteUser(id) {
  return Promise.resolve({});
}

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
};
