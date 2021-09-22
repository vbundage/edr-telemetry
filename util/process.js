const {exec} = require('child_process');
const os = require('os');

class Process {
  constructor(cmd) {
    this.name = cmd.split(' ')[0];
    this.cmd = cmd;
    this.username = os.userInfo().username;
  }

  startProcess() {
    this.startTime = new Date();
    this.pid = this.execCommand();
  }

  execCommand() {
    const process = exec(this.cmd, err => {
      if (err) {
        console.error(err);
      }
    })
    return process.pid;
  }
}

// const proc = new Process('ls -la');
// proc.startProcess();
// console.log(proc);

module.exports = Process;
