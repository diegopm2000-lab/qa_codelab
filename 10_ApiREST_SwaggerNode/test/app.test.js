// app.test.js

/* global describe, it, before, after, afterEach */
/* eslint global-require: "off" */

const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const SwaggerExpress = require('swagger-express-mw');
const request = require('supertest');

const sinonStubPromise = require('sinon-stub-promise');

const expectations = require('../test/expectations/expectations');

const configHelperMock = require('../test/helpers/config.helper.mock');
const mongooseHelperMock = require('../test/helpers/mongoose.helper.mock');
const loggerMock = require('../test/helpers/logger.mock');

let supertest;

let myServer;

// Inits of sinonStubPromise
sinonStubPromise(sinon);

describe('App - Tests', () => {
  before((done) => {
    myServer = proxyquire(
      '../app',
      {
        './api/helpers/log.helper': loggerMock,
        './api/helpers/config.helper': configHelperMock,
        './api/helpers/mongoose.helper': mongooseHelperMock,
      } // eslint-disable-line comma-dangle
    );
    done();
  });
  afterEach((done) => {
    setTimeout(() => {
      myServer.stop();
      done();
    }, 200);
  });

  describe('App Starts - Successfully, default Port CASE', () => {
    it('App Starts - Successfully, default Port CASE', (done) => {
      // Parametros de entrada
      process.env.PORT = '8081';
      // Launch operation
      setTimeout(() => {
        supertest = request(myServer.app);

        supertest
          .get('/healthcheck')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              const expectedResult = {
                everything: 'is ok',
              };
              expect(res.body).to.deep.equal(expectedResult);
              done();
            }
          });
      }, 500);
    });
  });

  describe('App Starts - Sucessfully, configPort passed as undefined CASE', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(configHelperMock, 'loadConfigFromYmlFile').resolves(expectations.config);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('App Starts - Sucessfully, configPort passed as undefined CASE', (done) => {
      // Parametros de inicio
      // NONE
      // Launch operation
      myServer.configPort = undefined;

      myServer.init();
      done();
    });
  });

  describe('App Start up - configHelper.setConfig Exception CASE', () => {
    let myStub1;
    let myStub2;

    before((done) => {
      myStub1 = sinon.stub(configHelperMock, 'loadConfigFromYmlFile').resolves(expectations.config);
      myStub2 = sinon.stub(configHelperMock, 'setConfig').throws(new Error('Error forzado en configHelper.setConfig'));
      done();
    });

    after((done) => {
      myStub1.restore();
      myStub2.restore();
      done();
    });

    it('App Starts - configHelper.setConfig Exception CASE', (done) => {
      // Parametros de inicio
      myServer.configPort = 8082;
      // Launch operation
      myServer.init();
      done();
    });
  });

  describe('App Start up - SwaggerExpress.create Error CASE', () => {
    let myStub1;
    let myStub2;

    before((done) => {
      myStub1 = sinon.stub(configHelperMock, 'loadConfigFromYmlFile').resolves(expectations.config);
      myStub2 = sinon.stub(SwaggerExpress, 'create').yields(new Error('Error forzado en SwaggerExpress.create'), undefined);
      done();
    });

    after((done) => {
      myStub1.restore();
      myStub2.restore();
      done();
    });

    it('App Start up - SwaggerExpress.create Error CASE', (done) => {
      // Parametros de inicio
      process.env.PORT = '8083';
      // Launch operation
      myServer.init();
      done();
    });
  });

  describe('App Starts - configHelper.loadConfigFromYmlFile Exception CASE', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(configHelperMock, 'loadConfigFromYmlFile').rejects(new Error('Error forzado en promesa configHelper.loadConfigFromYmlFile'));
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('App Starts - configHelper.loadConfigFromYmlFile Exception CASE', (done) => {
      // Parametros de inicio
      process.env.PORT = '8084';
      // Launch operation
      myServer.init();
      done();
    });
  });
});
