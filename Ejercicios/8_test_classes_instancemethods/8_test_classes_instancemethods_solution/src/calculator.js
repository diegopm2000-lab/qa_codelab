// calculator.js

/* eslint-disable class-methods-use-this */

class Calculator {
  add(a, b) {
    return a + b;
  }

  minus(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error("Can't divide by zero");
    }
    return a / b;
  }

  square(value) {
    return value * value;
  }

  async asyncSquare(value) {
    return Promise.resolve(this.square(value));
  }

  async asyncCube(value) {
    const squareResult = await this.asyncSquare(value);
    return Promise.resolve(squareResult * value);
  }
}

module.exports = Calculator;
