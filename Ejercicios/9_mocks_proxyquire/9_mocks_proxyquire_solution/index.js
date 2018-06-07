const Calculator = require('./src/calculator');

const value = 3;

Calculator.asyncSquare(value)
  .then((result) => {
    console.log(`resultado: ${result}`);
  })

