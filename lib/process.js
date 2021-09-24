const os = require('os');
const execUtil = require('../util/exec');

class Process {
  constructor(cmd) {
    this.type = 'PROCESS';
    this.cmd = cmd;
    this.username = os.userInfo().username;
  }

  async startProcess() {
    this.timestamp = new Date();
    this.processName = this.cmd.split(' ')[0];
    this.pid = await execUtil.execCommand(this.cmd);
  }
}

// const proc = new Process('ls -la');
// proc.startProcess().then(_ => console.log(proc));

module.exports = Process;
