// user.controller.test.js

/* global describe, it, before, after */

const request = require('supertest');
const { expect } = require('chai');
const should = require('chai').should();
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const expectations = require('../expectations/expectations');

const configHelperMock = require('../helpers/config.helper.mock');
const mongooseHelperMock = require('../helpers/mongoose.helper.mock');
const loggerMock = require('../helpers/logger.mock');
const userServiceMock = require('../services/user.service.mock');
const userService = require('../../api/services/user.service');

let myControllerHelper;

const configHelper = require('../../api/helpers/config.helper');

let myUserController;
// let myApp;

let supertest;

describe('UserController - Tests', () => {
  // let request = null;
  // let server = null;

  before((done) => {
    myControllerHelper = proxyquire(
      '../../api/helpers/controller.helper',
      {
        './log.helper': loggerMock,
      } // eslint-disable-line comma-dangle
    );
    myUserController = proxyquire(
      '../../api/controllers/user.controller',
      {
        '../helpers/controller.helper': myControllerHelper,
        '../helpers/log.helper': loggerMock,
        '../services/user.service': userServiceMock,
      } // eslint-disable-line comma-dangle
    );
    // myApp = proxyquire(
    //   '../../app',
    //   {
    //     './api/helpers/config.helper': configHelperMock,
    //     './api/helpers/mongoose.helper': mongooseHelperMock,
    //     './api/helpers/log.helper': loggerMock,
    //   } // eslint-disable-line comma-dangle
    // );

    // server = myApp.listen(done);
    // request = supertest.agent(server);

    // We don't need to start the application manually. init function was executed in the require
    // setTimeout(() => {
    //   myApp.stop();
    //   console.log('calling stop!');
    //   done();
    // }, 1000);
    done();
  });

  // after((done) => {
  //   server.close(done);
  // });

  describe('UserController - getUsers Tests', () => {
    describe('UserController - getUsers Successfully CASE', () => {
      let myStub1;
      //let myStub2;

      before((done) => {
        myStub1 = sinon.stub(configHelper, 'loadConfigFromYmlFile').resolves(expectations.config);
        //myStub2 = sinon.stub(userServiceMock, 'getUsers').resolves(expectations.usuarios);
        done();
      });

      after((done) => {
        myStub1.restore();
        //myStub2.restore();
        done();
      });

      it('UserController - getUsers Successfully CASE', (done) => {
        process.env.PORT = '8081';
        const myApp = proxyquire(
          '../../app',
          {
            './api/helpers/mongoose.helper': mongooseHelperMock,
          } // eslint-disable-line comma-dangle
        ); // eslint-disable-line global-require

        setTimeout(() => {
          supertest = request(myApp.server);
          console.log('Antes del request del it');
          supertest
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) {
                console.log('nos vamos por el if dando error');
                done(err);
              } else {
                console.log('nos vamos por el else');
                should.not.exist(err);
                expect(res.body).to.deep.equal(expectations.getGameSystemsExpectation);
                done();
              }
            });
        }, 1000);

        // We don't need to start the application manually. init function was executed in the require
        setTimeout(() => {
          myApp.stop();
          done();
        }, 1500);
      });
    });
  });
});
