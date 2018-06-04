// mongoose.helper.mock.js

console.log('mongoose.helper.mock cargado con EXITO!');

function connect() {
  console.log('entrando en el connect del mongoose.helper.mock');
  return Promise.resolve(true);
}

module.exports = {
  connect,
};
