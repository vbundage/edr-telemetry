const { exec } = require('child_process');
const os = require('os');

class Process {
  constructor(cmd) {
    this.type = 'PROCESS';
    this.cmd = cmd;
    this.username = os.userInfo().username;
  }

  async startProcess() {
    this.timestamp = new Date();
    this.processName = this.cmd.split(' ')[0];
    this.pid = await this.execCommand(this.cmd);
  }

  execCommand(cmd) {
    return new Promise((res, rej) => {
      const process = exec(cmd, err => {
        if (err) {
          rej(err);
        }
        res(process.pid)
      })
    })
  }
}

// const proc = new Process('ls -la');
// proc.startProcess().then(_ => console.log(proc));

module.exports = Process;
