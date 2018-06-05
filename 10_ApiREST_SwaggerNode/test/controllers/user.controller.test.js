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
let myControllerHelper;

let supertest;
let myServer;

const timeTest = 200;

describe('UserController - Tests', () => {
  before(() => {
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

    myControllerHelper = proxyquire(
      '../../api/helpers/controller.helper',
      {
        './log.helper': loggerMock,
      } // eslint-disable-line comma-dangle
    );

    // Controllers
    myUserController = proxyquire( // eslint-disable-line no-undef
      '../../api/controllers/user.controller',
      {
        '../helpers/log.helper': loggerMock,
        '../helpers/controller.helper': myControllerHelper,
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
  });

  describe('UserController - getUsers Tests', () => {
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
                done(err);
              } else {
                should.not.exist(err);
                expect(res.body).to.deep.equal(expectations.usuarios);
                done();
              }
            });
        }, timeTest);
      });
    });

    describe('UserController - getUsers Successfully (passing name, surname and loginname) CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(myUserService, 'getUsers').resolves(expectations.usuarios);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('UserController - getUsers Successfully (passing name, surname and loginname) CASE', (done) => {
        setTimeout(() => {
          supertest
            .get('/users?name=nametest&surname=surnametest&loginname=loginnametest')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                should.not.exist(err);
                expect(res.body).to.deep.equal(expectations.usuarios);
                done();
              }
            });
        }, timeTest);
      });
    });

    describe('UserController - getUsers throws error CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(myUserService, 'getUsers').throws(new Error('Forced error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('UserController - getUsers throws error CASE', (done) => {
        const msgError = {
          error: {
            code: 500,
            message: 'Internal Server Error',
            description: 'Internal Application Error in [User Controller]:getUsers',
          },
        };
        setTimeout(() => {
          supertest
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                should.not.exist(err);
                res.body.should.deep.eql(msgError);
                done();
              }
            });
        }, timeTest);
      });
    });
  });

  describe('UserController - getUserById Tests', () => {
    describe('UserController - getUserById Successfully CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(myUserService, 'getUserById').resolves(expectations.usuario1);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('UserController - getUserById Successfully CASE', (done) => {
        setTimeout(() => {
          supertest
            .get('/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                should.not.exist(err);
                expect(res.body).to.deep.equal(expectations.usuario1);
                done();
              }
            });
        }, timeTest);
      });
    });

    describe('UserController - getUserById Not Found CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(myUserService, 'getUserById').resolves(undefined);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('UserController - getUserById Not Found CASE', (done) => {
        const msgResponse = {
          message: 'User not found',
        };
        setTimeout(() => {
          supertest
            .get('/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                should.not.exist(err);
                res.body.should.deep.eql(msgResponse);
                done();
              }
            });
        }, timeTest);
      });
    });

    describe('UserController - getUserById Throws Error CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(myUserService, 'getUserById').throws(new Error('Forced Error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('UserController - getUserById Throws Error CASE', (done) => {
        const msgError = {
          error: {
            code: 500,
            message: 'Internal Server Error',
            description: 'Internal Application Error in [User Controller]:getUserById',
          },
        };
        setTimeout(() => {
          supertest
            .get('/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                should.not.exist(err);
                res.body.should.deep.eql(msgError);
                done();
              }
            });
        }, timeTest);
      });
    });
  });

  describe('UserController - createUser Tests', () => {
    describe('UserController - createUser Successfully CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(myUserService, 'createUser').resolves(expectations.usuario1);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('UserController - createUser Successfully CASE', (done) => {
        const userToCreate = Object.assign({}, expectations.usuario1);
        delete userToCreate.id;

        setTimeout(() => {
          supertest
            .post('/users')
            .send(userToCreate)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                should.not.exist(err);
                expect(res.body).to.deep.equal(expectations.usuario1);
                done();
              }
            });
        }, timeTest);
      });
    });

    describe('UserController - createUser User Not Created CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(myUserService, 'createUser').resolves(undefined);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('UserController - createUser User Not Created CASE', (done) => {
        const userToCreate = Object.assign({}, expectations.usuario1);
        delete userToCreate.id;

        const msgError = {
          message: 'User not created',
        };

        setTimeout(() => {
          supertest
            .post('/users')
            .send(userToCreate)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(409)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                should.not.exist(err);
                res.body.should.deep.eql(msgError);
                done();
              }
            });
        }, timeTest);
      });
    });

    describe('UserController - createUser throws Exception CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(myUserService, 'createUser').throws(new Error('Forced Error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('UserController - createUser throws Exception CASE', (done) => {
        const userToCreate = Object.assign({}, expectations.usuario1);
        delete userToCreate.id;

        const msgError = {
          error: {
            code: 500,
            message: 'Internal Server Error',
            description: 'Internal Application Error in [User Controller]:createUser',
          },
        };

        setTimeout(() => {
          supertest
            .post('/users')
            .send(userToCreate)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                should.not.exist(err);
                res.body.should.deep.eql(msgError);
                done();
              }
            });
        }, timeTest);
      });
    });
  });

  describe('UserController - updateUser Tests', () => {
    describe('UserController - updateUser Successfully CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(myUserService, 'updateUser').resolves(expectations.usuario1);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('UserController - updateUser Successfully CASE', (done) => {
        const userToUpdate = Object.assign({}, expectations.usuario1);

        setTimeout(() => {
          supertest
            .put('/users/1')
            .send(userToUpdate)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                should.not.exist(err);
                expect(res.body).to.deep.equal(expectations.usuario1);
                done();
              }
            });
        }, timeTest);
      });
    });

    describe('UserController - updateUser User Not Updated CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(myUserService, 'updateUser').resolves(undefined);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('UserController - updateUser User Not updated CASE', (done) => {
        const userToUpdate = Object.assign({}, expectations.usuario1);

        const msgError = {
          message: 'User not updated',
        };

        setTimeout(() => {
          supertest
            .put('/users/1')
            .send(userToUpdate)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(409)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                should.not.exist(err);
                res.body.should.deep.eql(msgError);
                done();
              }
            });
        }, timeTest);
      });
    });

    describe('UserController - updateUser throws Exception CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(myUserService, 'updateUser').throws(new Error('Forced Error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('UserController - updateUser throws Exception CASE', (done) => {
        const userToUpdate = Object.assign({}, expectations.usuario1);

        const msgError = {
          error: {
            code: 500,
            message: 'Internal Server Error',
            description: 'Internal Application Error in [User Controller]:updateUser',
          },
        };

        setTimeout(() => {
          supertest
            .put('/users/1')
            .send(userToUpdate)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                should.not.exist(err);
                res.body.should.deep.eql(msgError);
                done();
              }
            });
        }, timeTest);
      });
    });
  });

  describe('UserController - deleteUser Tests', () => {
    describe('UserController - deleteUser Successfully CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(myUserService, 'deleteUser').resolves(true);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('UserController - deleteUser Successfully CASE', (done) => {
        setTimeout(() => {
          supertest
            .delete('/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                should.not.exist(err);
                expect(res.body).to.deep.equal({ message: 'User deleted successfully' });
                done();
              }
            });
        }, timeTest);
      });
    });

    describe('UserController - deleteUser User Not Deleted CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(myUserService, 'deleteUser').resolves(false);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('UserController - deleteUser User Not deleted CASE', (done) => {
        const msgError = {
          message: 'User not found',
        };
        setTimeout(() => {
          supertest
            .delete('/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(409)
            .end((err,res) => {
              if (err) {
                done(err);
              } else {
                should.not.exist(err);
                res.body.should.deep.eql(msgError);
                done();
              }
            });
        }, timeTest);
      });
    });

    describe('UserController - deleteUser throws Exception CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(myUserService, 'deleteUser').throws(new Error('Forced Error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('UserController - deleteUser throws Exception CASE', (done) => {
        const msgError = {
          error: {
            code: 500,
            message: 'Internal Server Error',
            description: 'Internal Application Error in [User Controller]:deleteUser',
          },
        };

        setTimeout(() => {
          supertest
            .delete('/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err, res) => {
              if (err) {
                done(err);
              } else {
                should.not.exist(err);
                res.body.should.deep.eql(msgError);
                done();
              }
            });
        }, timeTest);
      });
    });
  });
});
