const path = require('path');
const fsUtil = require('../util/fs');
const execUtil = require('../util/exec');
const Activity = require('./activity');

class File extends Activity {
  constructor(filename = 'edr_test.txt', fileAction, content = '', filepath = './files') {
    super();
    this.absPath = path.resolve(path.join(filepath, filename));

    switch (fileAction) {
    case 'create':
      this.type = 'FILE_CREATION';
      this.descriptor = 'create';
      this.cmd = `touch ${this.absPath}`;
      break;
    case 'modify':
      this.type = 'FILE_MODIFICATION';
      this.descriptor = 'modify';
      this.content = content;
      this.cmd = `echo "${content}" >> ${this.absPath}`;
      break;
    case 'delete':
      this.type = 'FILE_DELETION';
      this.descriptor = 'delete';
      this.cmd = `rm ${this.absPath}`;
    }
  }

  async startProcess() {
    this.timestamp = new Date();
    this.processName = this.cmd.split(' ')[0];
    if (this.type === 'FILE_MODIFICATION' || this.type === 'FILE_DELETION') {
      const exists = await fsUtil.fileExists(this.absPath);
      if (!exists) {
        await execUtil.execCommand(`touch ${this.absPath}`);
      }
    }
    console.log(this.cmd);
    this.pid = await execUtil.execCommand(this.cmd);
  }
}

module.exports = File;
