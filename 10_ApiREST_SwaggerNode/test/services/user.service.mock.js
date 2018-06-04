// user.service.mock.js

/* eslint-disable no-unused-vars */

console.log('user.service.mock cargado con EXITO!');

function getUsers(filters) {
  console.log('Entrando en getUsers de user.service.mock');
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
