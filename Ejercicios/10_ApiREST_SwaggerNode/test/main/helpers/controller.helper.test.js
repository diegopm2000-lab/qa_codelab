// controller.helper.js

/* global describe, it */

const { expect } = require('chai');
const controllerHelper = require('../../../api/helpers/controller.helper');

describe('Controller Helper Tests', () => {
  describe('buildError - Tests', () => {
    it('buildError with stack Successfully', () => {
      // Enter params
      const err = {
        stack: 'message stack',
      };
      // Expected result
      const expectedResult = err.stack;
      // Launch operation
      const result = controllerHelper.buildErrorLog(err);
      // Check
      expect(expectedResult).to.deep.equal(result);
    });

    it('buildError with message Successfully', () => {
      // Enter params
      const err = {
        message: 'message',
      };
      // Expected result
      const expectedResult = err.message;
      // Launch operation
      const result = controllerHelper.buildErrorLog(err);
      // Check
      expect(expectedResult).to.deep.equal(result);
    });

    it('buildError directly Successfully', () => {
      // Enter params
      const err = {
        myerror: 'myerror',
      };
      // Expected result
      const expectedResult = JSON.stringify(err);
      // Launch operation
      const result = controllerHelper.buildErrorLog(err);
      // Check
      expect(expectedResult).to.deep.equal(result);
    });

    it('buildError undefined Successfully', () => {
      // Enter params
      const err = undefined;
      // Expected result
      const expectedResult = 'Error not defined';
      // Launch operation
      const result = controllerHelper.buildErrorLog(err);
      // Check
      expect(expectedResult).to.deep.equal(result);
    });

    it('buildError undefined Successfully', () => {
      // Enter params
      const err = undefined;
      // Expected result
      const expectedResult = 'Error not defined';
      // Launch result
      const result = controllerHelper.buildErrorLog(err);
      // Check
      expect(expectedResult).to.deep.equal(result);
    });
  });

  describe('buildErrorResponse - Tests', () => {
    it('buildErrorResponse - Successfully', () => {
      // Enter params
      const controllerName = 'controllerNameTest';
      const methodName = 'methodNameTest';
      // Expected result
      const expectedResult = {
        error: {
          code: 500,
          message: 'Internal Server Error',
          description: `Internal Application Error in ${controllerName}:${methodName}`,
        },
      };
      // Launch result
      const result = controllerHelper.buildErrorResponse(controllerName, methodName);
      // Check
      expect(expectedResult).to.deep.equal(result);
    });
  });

  describe('handleErrorResponse - Tests', () => {
    it('handleErrorResponse - Successfully', () => {

    });
  });
});
