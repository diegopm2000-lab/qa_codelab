// index.js

const calculator = require('./src/calculator');

const a = 3;
const b = 5;

console.log(`Add ${a} + ${b} = ${calculator.add(a, b)}`);
console.log(`Minus ${a} + ${b} = ${calculator.minus(a, b)}`);
console.log(`Multiply ${a} + ${b} = ${calculator.multiply(a, b)}`);
console.log(`Divide ${a} + ${b} = ${calculator.divide(a, b)}`);
