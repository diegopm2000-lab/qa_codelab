// mongoose.helper.test.js

/* global describe, it, beforeEach, afterEach, before, after */

const { expect } = require('chai');
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const { Mongoose } = require('mongoose');

const mongoose = new Mongoose();

const { Mockgoose } = require('mockgoose');

const mockgoose = new Mockgoose(mongoose);

const configHelperMock = require('../../mock/helpers/config.helper.mock');
const loggerMock = require('../../mock/helpers/logger.mock');

let myMongooseHelper;

describe('MongooseHelper - Tests', () => {
  beforeEach((done) => {
    myMongooseHelper = proxyquire(
      '../../../api/helpers/mongoose.helper',
      {
        '../helpers/config.helper': configHelperMock,
        '../helpers/log.helper': loggerMock,
      } // eslint-disable-line comma-dangle
    );

    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://example.com/TestingDB', { useNewUrlParser: true }, (err) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
  });

  afterEach(async () => {
    await mockgoose.helper.reset();
    await mongoose.disconnect();
    mockgoose.mongodHelper.mongoBin.childProcess.kill('SIGTERM');
  });

  describe('connect - (not connected yet) Test', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(loggerMock, 'info');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('connect - Test', async () => {
      // Launch operation
      await myMongooseHelper.connect();
      // assert(mySpy.calledWith(params));
    });
  });

  describe('connect - (connected) Test', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(loggerMock, 'info');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('connect - Test', async () => {
      // Launch operation
      console.log('Primera conexion...');
      await myMongooseHelper.connect();
      // Launch operation again, to test if there is an existing connection
      
      setTimeout(() => {
        console.log('Segunda conexion...');
        myMongooseHelper.connect()
          .then(() => {
          // Success
          });
      }, 5000);

      // assert(mySpy.calledWith(params));
    });
  });

  describe('connect - Failed connection Test', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(mongoose.Connection.prototype, 'on').yields(new Error('Connection forced error'));
      done();
    });

    after(async (done) => {
      myStub.restore();
      done();
    });

    it('connect - Failed connection Test', (done) => {
      // Launch operation
      myMongooseHelper.connect()
        .then(() => {
          done(new Error('Failed in testing the connection failure!'));
        })
        .catch(() => {
          done();
        });
    });
  });

  describe('connect - (ERROR) - Throwing Exception CASE', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(loggerMock, 'info').throws(new Error('Forced Error'));
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('connect - Test', async () => {
      // Expected Result
      const messageError = 'Forced Error';

      // Launch operation
      try {
        await myMongooseHelper.connect();
      } catch (error) {
        expect(error.message).to.equal(messageError);
      }
    });
  });
});
