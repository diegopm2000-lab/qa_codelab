// mongoose.helper.mock.js

console.log('mongoose.helper.mock cargado con EXITO!');

function connect() {
  return new Promise((resolve) => {
    console.log('entrando en el connect del mongoose.helper.mock...');
    resolve(true);
  });
}

module.exports = {
  connect,
};
