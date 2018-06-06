// mongoose.helper.test.js

/* global describe, it, before, after */

const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const { Mongoose } = require('mongoose');

const mongoose = new Mongoose();

const { Mockgoose } = require('mockgoose');

const mockgoose = new Mockgoose(mongoose);

const configHelperMock = require('../helpers/config.helper.mock');
const loggerMock = require('../helpers/logger.mock');

let myMongooseHelper;

describe('MongooseHelper - Tests', () => {
  before((done) => {
    myMongooseHelper = proxyquire(
      '../../api/helpers/mongoose.helper',
      {
        '../helpers/config.helper': configHelperMock,
        '../helpers/log.helper': loggerMock,
      } // eslint-disable-line comma-dangle
    );

    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://example.com/TestingDB', (err) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
  });

  after(async () => {
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
      await myMongooseHelper.connect();
      await myMongooseHelper.connect();
      // assert(mySpy.calledWith(params));
    });
  });
});

// PRUEBA DEL FALLO DE CONEXION

describe('MongooseHelper - Tests', () => {
  before(() => {
    myMongooseHelper = proxyquire(
      '../../api/helpers/mongoose.helper',
      {
        '../helpers/config.helper': configHelperMock,
        '../helpers/log.helper': loggerMock,
      } // eslint-disable-line comma-dangle
    );
  });

  describe('connect - Failed connection Test', () => {
    let mySpy;
    let myStub;

    before((done) => {
      mySpy = sinon.spy(loggerMock, 'info');
      myStub = sinon.stub(mongoose, 'connect').yields(new Error('Connection forced error', () => {
      }));
      done();
    });

    after(async (done) => {
      mySpy.restore();
      myStub.restore();
      done();
    });

    it('connect - Failed connection Test', async (done) => {
      try {
        mongoose.connect('mongodb://example.com/TestingDB', (err) => {
          try {
            if (err) {
              mockgoose.mongodHelper.mongoBin.childProcess.kill('SIGTERM');
              done();
            } else {
              done(err);
            }
          } catch (error) {
            console.error(error.message);
          }
        });
      } catch (error) {
        console.log(`-------------------> Error final: ${error.message}`);
      }
      // Launch operation
      await myMongooseHelper.connect();
    });
  });
});
