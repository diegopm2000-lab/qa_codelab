// mockReadYaml.js

const path = require('path');

const expectations = require('../expectations/expectations');

const PATH_CONFIG_FILES = './config';

function readYaml(filename, callback) {
  if (filename === `${PATH_CONFIG_FILES}${path.sep}nameFileError.yml`) {
    return callback(new Error('Error obteniendo fichero yaml de directorio local'), undefined);
  } else if (filename === `${PATH_CONFIG_FILES}${path.sep}nameFileException.yml`) {
    throw new Error('Excepcion Generada al obtener fichero yaml de directorio local');
  } else {
    return callback(undefined, expectations.yamlConfigExpectation);
  }
}

module.exports = readYaml;
