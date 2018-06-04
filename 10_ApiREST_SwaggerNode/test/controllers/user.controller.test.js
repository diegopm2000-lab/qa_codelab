// user.controller.test.js

/* global describe, it, before, after */

const { expect } = require('chai');
const should = require('chai').should();
const request = require('supertest');
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const expectations = require('../expectations/expectations');

const configHelperMock = require('../helpers/config.helper.mock');
const mongooseHelperMock = require('../helpers/mongoose.helper.mock');
const loggerMock = require('../helpers/logger.mock');

let myUserRepository;
let myUserService;

let supertest;
let myServer;

describe('UserController - Tests', () => {
  before(() => {
    console.log('Entrando en before principal...');
    // Repositories
    myUserRepository = proxyquire(
      '../repositories/user.repository.mock',
      {} // eslint-disable-line comma-dangle
    );

    // Services
    myUserService = proxyquire(
      '../../api/services/user.service',
      {
        '../helpers/log.helper': loggerMock,
        '../repositories/user.repository': myUserRepository,
      } // eslint-disable-line comma-dangle
    );

    // Controllers
    myUserController = proxyquire(
      '../../api/controllers/user.controller',
      {
        '../helpers/log.helper': loggerMock,
        '../services/user.service': myUserService,
      } // eslint-disable-line comma-dangle
    );

    // App
    myServer = proxyquire(
      '../../app',
      {
        './api/helpers/log.helper': loggerMock,
        './api/helpers/config.helper': configHelperMock,
        './api/helpers/mongoose.helper': mongooseHelperMock,
      } // eslint-disable-line comma-dangle
    );

    supertest = request(myServer.app);
    console.log('----> saliendo del before principal');
  });

  describe('UserController - getUsers Successfully CASE', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(myUserService, 'getUsers').resolves(expectations.usuarios);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('UserController - getUsers Successfully CASE', (done) => {
      setTimeout(() => {
        supertest
          .get('/users')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              console.log(`res: ${JSON.stringify(res.body)}, res: ${res}`);
              console.log('nos vamos por el if dando error');
              console.error(err.stack);
              done(err);
            } else {
              console.log('nos vamos por el else');
              should.not.exist(err);
              expect(res.body).to.deep.equal(expectations.usuarios);
              done();
            }
          });
      }, 1500);
    });
  });
});
