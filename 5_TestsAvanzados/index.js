// index.js

const calculator = require('./src/calculator');

const value = 10;
console.log(`El cuadrado de ${value} es: ${calculator.sqrt(value)}, método síncrono`);

calculator.asyncSqrt(value)
  .then((result) => {
    console.log(`El cuadrado de ${value} es: ${result}, método asíncrono`);
  });
