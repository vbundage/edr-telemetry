const fs = require('fs');
const fsPromises = require('fs/promises');

const fileExists = path => {
  return new Promise((res, _) => {
    fs.access(path, fs.constants.F_OK, error => {
      res(!error);
    });
  }).catch(error => {
    throw error;
  });
}

const writeFile = (path, data) => {
  return fsPromises.writeFile(path, data, { encoding: 'utf-8' })
    .catch(error => {
      throw error;
    });
};

const readFile = path => {
  return fsPromises.readFile(path, { encoding: 'utf-8' })
    .catch(error => {
      throw error;
    });
};

const makeDir = path => {
  return fsPromises.mkdir(path)
    .catch(error => {
      throw error;
    });
}

module.exports = {
  fileExists,
  writeFile,
  readFile,
  makeDir,
};
