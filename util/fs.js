const fs = require('fs');
const fsPromises = require('fs/promises');

const fileExists = path => {
  return new Promise((res, _) => {
    fs.access(path, fs.constants.F_OK, error => {
      res(!error);
    });
  });
}

const writeFile = (path, data) => {
  return fsPromises.writeFile(path, data, { encoding: 'utf-8' });
};

const readFile = path => {
  return fsPromises.readFile(path, { encoding: 'utf-8' });
};

module.exports = {
  fileExists,
  writeFile,
  readFile,
};
