// calculator.test.js

/* global describe, it */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */

const { expect } = require('chai');
const calculator = require('../src/calculator');

describe('Calculator - Tests', () => {
  describe('Testing the Operations using expect', () => {
    it('Testing the sum operation', () => {
      // Enter params
      const a = 1;
      const b = 1;
      // Expected result
      const expectedResult = 2;
      // Launch operation
      const result = calculator.add(a, b);
      // Check
      expect(result).to.equal(expectedResult);
    });

    it('Testing the minus operation', () => {
      // Enter params
      const a = 1;
      const b = 1;
      // Expected result
      const expectedResult = 0;
      // Launch operation
      const result = calculator.minus(a, b);
      // Check
      expect(result).to.equal(expectedResult);
    });

    it('Testing the multiply operation', () => {
      // Enter params
      const a = 3;
      const b = 2;
      // Expected result
      const expectedResult = 6;
      // Launch operation
      const result = calculator.multiply(a, b);
      // Check
      expect(result).to.equal(expectedResult);
    });

    it('Testing the divide operation', () => {
      // Enter params
      const a = 6;
      const b = 2;
      // Expected result
      const expectedResult = 3;
      // Launch operation
      const result = calculator.divide(a, b);
      // Check
      expect(result).to.equal(expectedResult);
    });

    it('Testing the divide operation by zero', () => {
      // Enter params
      const a = 6;
      const b = 0;
      // Expected result
      const expectedResult = new Error("Can't divide by zero");
      // Launch operation
      try {
        calculator.divide(a, b);
      } catch (error) {
        // Check
        expect(error.message).to.equal(expectedResult.message);
      }
    });

    it('Testing the sqrt operation', () => {
      // Enter params
      const value = 10;
      // Expected result
      const expectedResult = value * value;
      // Launch operation
      const result = calculator.sqrt(value);
      // Check
      expect(result).to.equal(expectedResult);
    });

    it('Testing the async sqrt operation', async () => {
      // Enter params
      const value = 10;
      // Expected result
      const expectedResult = value * value;
      // Launch operation
      const result = await calculator.asyncSqrt(value);
      // Check
      expect(result).to.equal(expectedResult);
    });

    it('Testing the async sqrt operation alternative', (done) => {
      // Enter params
      const value = 10;
      // Expected result
      const expectedResult = value * value;
      // Launch operation
      calculator.asyncSqrt(value)
        .then((result) => {
        // Check
          expect(result).to.equal(expectedResult);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('Testing the async sqrt operation with callback old school way', (done) => {
      // Enter params
      const value = 10;
      // Expected result
      const expectedResult = value * value;
      // Launch operation
      calculator.asyncSqrtOld(value, (value, result) => {
        // Check
        expect(result).to.equal(expectedResult);
        done();
      });
    });
  });
});
