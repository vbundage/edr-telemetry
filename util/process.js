const { exec } = require('child_process');
const os = require('os');

class Process {
  constructor(cmd) {
    this.name = cmd.split(' ')[0];
    this.cmd = cmd;
    this.username = os.userInfo().username;
  }

  async startProcess() {
    this.startTime = new Date();
    this.pid = await this.execCommand();
  }

  execCommand() {
    return new Promise((res, rej) => {
      const process = exec(this.cmd, err => {
        if (err) {
          rej(err);
        }
        res(process.pid)
      })
    })
  }
}

// const proc = new Process('ls -la');
// proc.startProcess();
// console.log(proc);

module.exports = Process;
