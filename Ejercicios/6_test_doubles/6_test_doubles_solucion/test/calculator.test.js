// calculator.test.js

/* global describe, it, before, after */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */

const { expect, assert } = require('chai');
const sinon = require('sinon');

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

    describe('Testing all square operations', () => {
      it('Testing the square operation', () => {
        // Enter params
        const value = 10;
        // Expected result
        const expectedResult = value * value;
        // Launch operation
        const result = calculator.square(value);
        // Check
        expect(result).to.equal(expectedResult);
      });

      describe('Testing the async square operation', () => {
        let mySpy;

        before((done) => {
          mySpy = sinon.spy(calculator, 'square');
          done();
        });

        after((done) => {
          mySpy.restore();
          done();
        });

        it('Testing the async square operation', async () => {
          // Enter params
          const value = 10;
          // Expected result
          const expectedResult = value * value;
          // Launch operation
          const result = await calculator.asyncSquare(value);
          // Check
          expect(result).to.equal(expectedResult);
          assert(mySpy.calledWith(value));
        });
      });

      describe('Testing the async square operation stubbing square', () => {
        let myStub;

        before((done) => {
          myStub = sinon.stub(calculator, 'square').returns(100);
          done();
        });

        after((done) => {
          myStub.restore();
          done();
        });

        it('Testing the async square operation stubbing square', async () => {
          // Enter params
          const value = 10;
          // Expected result
          const expectedResult = value * value;
          // Launch operation
          const result = await calculator.asyncSquare(value);
          // Check
          expect(result).to.equal(expectedResult);
        });
      });

      it('Testing the async square operation alternative', (done) => {
        // Enter params
        const value = 10;
        // Expected result
        const expectedResult = value * value;
        // Launch operation
        calculator.asyncSquare(value)
          .then((result) => {
          // Check
            expect(result).to.equal(expectedResult);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });

      it('Testing the async square operation with callback old school way', (done) => {
        // Enter params
        const value = 10;
        // Expected result
        const expectedResult = value * value;
        // Launch operation
        calculator.asyncSquareOld(value, (value, result) => {
          // Check
          expect(result).to.equal(expectedResult);
          done();
        });
      });
    });

    describe('Testing the async cube operation stubbing asyncSquare', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(calculator, 'asyncSquare').resolves(100);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('Testing the async cube operation stubbing asyncSquare', async () => {
        // Enter params
        const value = 10;
        // Expected result
        const expectedResult = value * value * value;
        // Launch operation
        // Launch operation
        const result = await calculator.asyncCube(value);
        // Check
        expect(result).to.equal(expectedResult);
      });
    });
  });
});
