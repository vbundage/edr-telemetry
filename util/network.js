const os = require('os');

class Network {
  constructor() {
    this.type = 'NETWORK';
    this.username = os.userInfo().username;
  }
}
