// message.helper.test

/* global describe, before, after, it */

const { expect } = require('chai');
const sinon = require('sinon');

const messageHelper = require('../../../api/helpers/message.helper');

describe('Message Helper Tests', () => {
  it('buildGenericMessage - Successfully', () => {
    // Enter params
    const nameMessage = 'nameMessage';
    const textMessage = 'textMessage';
    // Expected Result
    const expectedResult = {
      nameMessage: textMessage,
    };
    // Launch operation
    const result = messageHelper.buildGenericMessage(nameMessage, textMessage);
    // Check
    expect(expectedResult).to.deep.equal(result);
  });

  describe('buildErrorMessage - Tests', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(messageHelper, 'buildGenericMessage').returns({ message: 'text' });
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('buildErrorMessage - Successfully', () => {
      // Enter params
      const text = 'text';
      // ExpectedResult
      const expectedResult = {
        message: text,
      };
      // Launch operation
      const result = messageHelper.buildErrorMessage(text);
      // Check
      expect(expectedResult).to.deep.equal(result);
    });
  });

  describe('buildMessage - Tests', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(messageHelper, 'buildGenericMessage').returns({ message: 'text' });
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('buildErrorMessage - Successfully', () => {
      // Enter params
      const text = 'text';
      // ExpectedResult
      const expectedResult = {
        message: text,
      };
      // Launch operation
      const result = messageHelper.buildMessage(text);
      // Check
      expect(expectedResult).to.deep.equal(result);
    });
  });
});
