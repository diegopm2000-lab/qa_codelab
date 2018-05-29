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

function sqrt(value) {
  return value * value;
}

async function asyncSqrt(value) {
  return Promise.resolve(sqrt(value));
}

function asyncSqrtOld(value, callback) {
  setTimeout(() => {
    callback(value, value * value);
  }, Math.random() * 100);
}

module.exports = {
  add,
  minus,
  multiply,
  divide,
  sqrt,
  asyncSqrt,
  asyncSqrtOld,
};

