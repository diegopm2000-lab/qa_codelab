// calculator.js

const logger = require('./logger');

const NAME_MODULE = '[Calculator]';

function add(a, b) {
  logger.debug(`${NAME_MODULE} ${add.name} (IN) a: ${a}, b: ${b}`);

  const result = a + b;

  logger.debug(`${NAME_MODULE} ${add.name} (OUT) -> ${result}`);
  return result;
}

function minus(a, b) {
  logger.debug(`${NAME_MODULE} ${minus.name} (IN) a: ${a}, b: ${b}`);

  const result = a - b;

  logger.debug(`${NAME_MODULE} ${minus.name} (OUT) -> ${result}`);
  return result;
}

function multiply(a, b) {
  logger.debug(`${NAME_MODULE} ${multiply.name} (IN) a: ${a}, b: ${b}`);

  const result = a * b;

  logger.debug(`${NAME_MODULE} ${multiply.name} (OUT) -> ${result}`);
  return result;
}

function divide(a, b) {
  logger.debug(`${NAME_MODULE} ${divide.name} (IN) a: ${a}, b: ${b}`);
  if (b === 0) {
    logger.debug(`${NAME_MODULE} ${divide.name} (OUT) -> Throws Error: Can't divide by zero`);
    throw new Error("Can't divide by zero");
  }
  const result = a / b;
  logger.debug(`${NAME_MODULE} ${divide.name} (OUT) -> ${result}`);
  return result;
}

function square(value) {
  logger.debug(`${NAME_MODULE} ${square.name} (IN) value: ${value}`);

  const result = value * value;

  logger.debug(`${NAME_MODULE} ${square.name} (OUT) -> ${result}`);
  return result;
}

async function asyncSquare(value) {
  logger.debug(`${NAME_MODULE} ${asyncSquare.name} (IN) value: ${value}`);

  return new Promise((resolve) => {
    const result = module.exports.square(value);
    logger.debug(`${NAME_MODULE} ${asyncSquare.name} (OUT) -> ${result}`);
    resolve(result);
  });
}

async function asyncCube(value) {
  logger.debug(`${NAME_MODULE} ${asyncCube.name} (IN) value: ${value}`);
  const squareResult = await module.exports.asyncSquare(value);

  return new Promise((resolve) => {
    const result = squareResult * value;
    logger.debug(`${NAME_MODULE} ${asyncCube.name} (OUT) -> ${result}`);
    resolve(result);
  });
}

module.exports = {
  add,
  minus,
  multiply,
  divide,
  square,
  asyncSquare,
  asyncCube,
};
