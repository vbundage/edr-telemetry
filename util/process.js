const {exec} = require('child_process');

class Process {
  constructor(name, cmd) {
    this.name = name;
    this.cmd = cmd;
    this.username = process.env.USER;
  }

  startProcess() {
    this.startTime = new Date();
    this.pid = this.execCommand();
  }

  execCommand() {
    const process = exec(this.cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      console.error(stderr);
    })
    return process.pid;
  }
}

// const proc = new Process('ls', 'ls -la');
// proc.startProcess();
// console.log(proc);

module.exports = Process;
