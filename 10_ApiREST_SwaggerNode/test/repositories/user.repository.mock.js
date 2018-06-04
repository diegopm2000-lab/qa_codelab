// user.repository.mock.js

/* eslint-disable no-unused-vars */

console.log('cargado el user.repository.mock con EXITO!');

function getUsers(filter) {
  console.log('Entrando en getUsers de user.repository.mock');
  return Promise.resolve([]);
}

function getUserById(id) {

}

function getUserByName(name) {

}

function createUser(userIN) {

}

function updateUser(userIN) {

}

function deleteUser(id) {

}

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
};
