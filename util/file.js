const path = require('path');
const fs = require('fs');
const Process = require('./process');

class File extends Process {
  constructor(filename = 'edr_test.txt', fileAction, content = '', filepath = '../files') {
    super();
    this.absPath = path.resolve(path.join(filepath, filename));
    this.content = content;

    switch (fileAction) {
    case 'create':
      this.type = 'FILE_CREATION';
      this.descriptor = 'create';
      this.cmd = `touch ${this.absPath}`;
      break;
    case 'modify':
      this.type = 'FILE_MODIFICATION';
      this.descriptor = 'modify';
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
    if (this.type === 'FILE_CREATION' || this.type === 'FILE_DELETION') {
      const exists = await this.fileExists();
      if (!exists) {
        await this.execCommand(`touch ${this.absPath}`);
      }
    }
    this.pid = await this.execCommand(this.cmd);
  }

  fileExists() {
    return new Promise((resolve, _) => {
      fs.access(this.absPath, fs.constants.F_OK, error => {
        resolve(!error);
      });
    });
  }
}

// const file1 = new File('joe.txt', 'modify', 'some content');
// file1.startProcess().then(_ => console.log(file1));

module.exports = File;
