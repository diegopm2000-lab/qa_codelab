// user.service.test

/* global describe, before, after, it */

const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

const loggerMock = require('../helpers/logger.mock');
const userRepositoryMock = require('../repositories/user.repository.mock');
const expectations = require('../expectations/expectations');

let userService;

describe('User Service - Tests', () => {
  before(() => {
    userService = proxyquire(
      '../../../api/services/user.service',
      {
        '../helpers/log.helper': loggerMock,
        '../repositories/user.repository': userRepositoryMock,
      } // eslint-disable-line comma-dangle
    );
  });

  describe('getUsers Test', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(userRepositoryMock, 'getUsers').resolves(expectations.usuarios);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('getUsers Test', async () => {
      // Enter params
      const filter = {};
      // Expected result
      const expectedResult = expectations.usuarios;
      // Launch operation
      const result = await userService.getUsers(filter);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });

  describe('getUserById Test', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(userRepositoryMock, 'getUserById').resolves(expectations.usuario1);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('getUserById Test', async () => {
      // Enter params
      const id = 'id1';
      // Expected result
      const expectedResult = expectations.usuario1;
      // Launch operation
      const result = await userService.getUserById(id);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });

  describe('getUserByName Test', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(userRepositoryMock, 'getUserByName').resolves(expectations.usuario1);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('getUserById Test', async () => {
      // Enter params
      const name = 'name1';
      // Expected result
      const expectedResult = expectations.usuario1;
      // Launch operation
      const result = await userService.getUserByName(name);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });

  describe('createUser Test', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(userRepositoryMock, 'createUser').resolves(expectations.usuario2);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('getUserById Test', async () => {
      // Enter params
      const user = {
        name: 'name2',
        surname: 'surname2',
        loginname: 'loginname2',
        password: 'password2',
      };
      // Expected result
      const expectedResult = expectations.usuario2;
      // Launch operation
      const result = await userService.createUser(user);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });

  describe('updateUser Test', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(userRepositoryMock, 'updateUser').resolves(expectations.usuario2);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('getUserById Test', async () => {
      // Enter params
      const user = {
        name: 'name2',
        surname: 'surname2',
        loginname: 'loginname2',
        password: 'password2',
      };
      // Expected result
      const expectedResult = expectations.usuario2;
      // Launch operation
      const result = await userService.updateUser(user);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });

  describe('deleteUser Test', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(userRepositoryMock, 'deleteUser').resolves(true);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('getUserById Test', async () => {
      // Enter params
      const id = 'id1';
      // Expected result
      const expectedResult = true;
      // Launch operation
      const result = await userService.deleteUser(id);
      // Check
      expect(result).to.equal(expectedResult);
    });
  });
});
