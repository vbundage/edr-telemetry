const os = require('os');

class Activity {
  constructor() {
    this.username = os.userInfo().username;
  }

  startActivity() {
    switch (this.type) {
    case 'NETWORK_CONNECTION':
      return this.makeRequest();
    default:
      return this.startProcess();
    }
  }
}

module.exports = Activity;
