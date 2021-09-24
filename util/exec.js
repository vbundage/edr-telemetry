const { exec } = require('child_process');

const execCommand = cmd => {
  return new Promise((res, rej) => {
    const process = exec(cmd, err => {
      if (err) {
        rej(err);
      }
      res(process.pid)
    })
  })
}

module.exports = {
  execCommand,
};
