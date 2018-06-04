// user.repository.test.js

/* global describe, before, after, it */

const { expect } = require('chai');
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

const loggerMock = require('../helpers/logger.mock');
const { Mongoose } = require('mongoose');

const mongoose = new Mongoose();

const { Mockgoose } = require('mockgoose');

const mockgoose = new Mockgoose(mongoose);
const expectations = require('../expectations/expectations');

let User;

// const userRepository = require('../../../api/repositories/user.repository');
let userRepository;

describe('UserRepository - Tests', () => {
  before((done) => {
    User = proxyquire(
      '../../api/repositories/user',
      {
        mongoose,
      } // eslint-disable-line comma-dangle
    );
    userRepository = proxyquire(
      '../../api/repositories/user.repository',
      {
        '../helpers/log.helper': loggerMock,
        mongoose,
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

  describe('getUsers - Test', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(User, 'find').resolves(expectations.usuarios);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('getUsers - Test', async () => {
      // Enter params
      const filter = {};
      // Expected result
      const expectedResult = expectations.usuarios;
      // Launch operation
      const result = await userRepository.getUsers(filter);

      expect(expectedResult).to.deep.equal(result);
    });
  });

  describe('getUserById - Test', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(User, 'findOne').resolves(expectations.usuario1);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('getUserById - Test', async () => {
      // Enter params
      const filter = {};
      // Expected result
      const expectedResult = expectations.usuario1;
      // Launch operation
      const result = await userRepository.getUserById(filter);

      expect(expectedResult).to.deep.equal(result);
    });
  });

  describe('getUserByName - Test', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(User, 'findOne').resolves(expectations.usuario1);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('getUserByName - Test', async () => {
      // Enter params
      const filter = {};
      // Expected result
      const expectedResult = expectations.usuario1;
      // Launch operation
      const result = await userRepository.getUserByName(filter);

      expect(expectedResult).to.deep.equal(result);
    });
  });

  describe('createUser - Test', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(User, 'create').resolves(expectations.usuario1);
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });

    it('createUser - Test', async () => {
      // Enter params
      const filter = {};
      // Expected result
      const expectedResult = expectations.usuario1;
      // Launch operation
      const result = await userRepository.createUser(filter);

      expect(expectedResult).to.deep.equal(result);
    });
  });

  describe('updateUser - Test', () => {
    let myStub1;
    let myStub2;

    before((done) => {
      // myStub1 = sinon.stub(User, 'where').resolves(expectations.usuario1);
      myStub1 = sinon.stub(User, 'update').resolves(expectations.usuario1);
      myStub2 = sinon.stub(userRepository, 'getUserById').resolves(expectations.usuario1);
      done();
    });

    after((done) => {
      // myStub1.restore();
      myStub1.restore();
      myStub2.restore();
      done();
    });

    it('updateUser - Test', async () => {
      // Enter params
      const filter = {};
      // Expected result
      const expectedResult = expectations.usuario1;
      // Launch operation
      const result = await userRepository.updateUser(filter);

      expect(expectedResult).to.deep.equal(result);
    });
  });

  describe('deleteUser - Test', () => {
    describe('deleteUser - Test CASE Successfully', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(User, 'deleteOne').resolves({ n: 1, ok: 1 });
        done();
      });

      after((done) => {
        // myStub1.restore();
        myStub.restore();
        done();
      });

      it('deleteUser - Test CASE Successfully', async () => {
        // Enter params
        const filter = {};
        // Expected result
        const expectedResult = true;
        // Launch operation
        const result = await userRepository.deleteUser(filter);

        expect(expectedResult).to.deep.equal(result);
      });
    });

    describe('deleteUser - Test CASE Not deleted', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(User, 'deleteOne').resolves({ n: 0, ok: 0 });
        done();
      });

      after((done) => {
        // myStub1.restore();
        myStub.restore();
        done();
      });

      it('deleteUser - Test CASE Not deleted', async () => {
        // Enter params
        const filter = {};
        // Expected result
        const expectedResult = false;
        // Launch operation
        const result = await userRepository.deleteUser(filter);

        expect(expectedResult).to.deep.equal(result);
      });
    });
  });
});
