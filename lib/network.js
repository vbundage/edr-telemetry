const axios = require('axios');
const Activity = require('./activity');

class NetworkConnection extends Activity {
  constructor(url, message = 'Tom Hanks') {
    super();
    this.type = 'NETWORK_CONNECTION';
    this.url = url;
    this.pid = process.pid;
    this.processName = 'node';
    this.message = message;
  }

  makeRequest() {
    this.timestamp = new Date();
    return axios.post(this.url, {
      message: this.message,
    }).then(response => {
      this.protocol = response.request.protocol;
      this.dataBytesize = response.request.getHeader('Content-Length');
      this.sourceAddress = response.request.socket.localAddress;
      this.sourcePort = response.request.socket.localPort;
      this.destinationAddress = response.request.socket.remoteAddress;
      this.destinationPort = response.request.socket.remotePort;
    })
  }
}

module.exports = NetworkConnection;
