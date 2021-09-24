const fs = require('fs');

const fileExists = path => {
  return new Promise((resolve, _) => {
    fs.access(path, fs.constants.F_OK, error => {
      resolve(!error);
    });
  });
}

module.exports = {
  fileExists,
};
