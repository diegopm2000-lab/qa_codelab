// config.helper.test.js

/* global describe, it, before */

const { expect } = require('chai');
const proxyquire = require('proxyquire').noCallThru();

const expectations = require('../expectations/expectations');

// MOCKS REQUIRED
const mockReadYaml = require('./readYaml.mock');
const loggerMock = require('./logger.mock');

// MAIN MODULE TESTED REQUIRED
let myConfigHelper;

describe('ConfigHelper - Tests', () => {
  before((done) => {
    myConfigHelper = proxyquire(
      '../../api/helpers/config.helper',
      {
        'read-yaml': mockReadYaml,
        '../helpers/log.helper': loggerMock,
      } // eslint-disable-line comma-dangle
    );
    done();
  });

  describe('SetConfig & getConfig - Tests', () => {
    it('SetConfig & getConfig - Successfully', () => {
      // Enter params
      const config = {
        logLevel: 'debug',
      };
      // Expected result
      const expectedResult = config;
      myConfigHelper.setConfig(config);
      // Launch roperation
      const result = myConfigHelper.getConfig();
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });

  describe('loadConfigFromYmlFile - Tests', () => {
    it('loadConfigFromYmlFile - Successfully', (done) => {
      // Enter params
      const nameFile = 'nameFile.yml';
      // Expected Result
      const expectedResult = expectations.yamlConfigExpectation;
      // Launch operation
      myConfigHelper.loadConfigFromYmlFile(nameFile)
        .then((result) => {
          // Check
          expect(result).to.deep.equal(expectedResult);
          done();
        })
        .catch((error) => {
          done(error);
        });
    });

    it('loadConfigFromYmlFile - ReadYaml returns Error', (done) => {
      // Enter params
      const nameFile = './config/nameFileError.yml';
      // Launch operation
      myConfigHelper.loadConfigFromYmlFile(nameFile)
        .then(() => {
          done(new Error('Error!'));
        })
        .catch(() => {
          // Check
          done();
        });
    });

    it('loadConfigFromYmlFile - ReadYaml throws Exception', (done) => {
      // Enter params
      const nameFile = './config/nameFileException.yml';
      // Launch operation
      myConfigHelper.loadConfigFromYmlFile(nameFile)
        .then(() => {
          done(new Error('Error!'));
        })
        .catch(() => {
          // Check
          done();
        });
    });
  });
});
