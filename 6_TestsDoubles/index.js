const calculator = require('./src/calculator');

const value = 3;

calculator.asyncCube(value)
  .then((result) => {
    console.log(`cubo de ${value} es ${result}`);
  });
