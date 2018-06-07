// calculator.js

class Calculator {
  static add(a, b) {
    return a + b;
  }

  static minus(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    if (b === 0) {
      throw new Error("Can't divide by zero");
    }
    return a / b;
  }

  static square(value) {
    return value * value;
  }

  static async asyncSquare(value) {
    return Promise.resolve(Calculator.square(value));
  }

  static async asyncCube(value) {
    const squareResult = await Calculator.asyncSquare(value);
    return Promise.resolve(squareResult * value);
  }
}

module.exports = Calculator;
