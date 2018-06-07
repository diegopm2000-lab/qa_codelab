// calculator.js

function add(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Can't divide by zero");
  }
  return a / b;
}

function square(value) {
  return value * value;
}

async function asyncSquare(value) {
  return Promise.resolve(square(value));
}

function asyncSquareOld(value, callback) {
  setTimeout(() => {
    callback(value, value * value);
  }, Math.random() * 100);
}

module.exports = {
  add,
  minus,
  multiply,
  divide,
  square,
  asyncSquare,
  asyncSquareOld,
};

