const execUtil = require('../util/exec');
const Activity = require('./activity');

class Process extends Activity {
  constructor(cmd) {
    super();
    this.type = 'PROCESS';
    this.cmd = cmd;
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
