// expectations.js

const usuario1 = {
  id: 'id1',
  name: 'name1',
  surname: 'surname1',
  loginname: 'loginname1',
  password: 'password1',
};

const usuario2 = {
  id: 'id2',
  name: 'name2',
  surname: 'surname2',
  loginname: 'loginname2',
  password: 'password2',
};

const usuarios = [usuario1, usuario2];

const config = {
  appName: 'API REST CRUD Example for QA Lab',
  logLevel: 'debug',
  mongodatabase: {
    mongoURL: 'mongodb://localhost:27017',
    database: 'qalab',
  },
};

module.exports = {
  usuario1,
  usuario2,
  usuarios,
  config,
};
