const os = require('os');
const axios = require('axios');

const TEST_URL = 'https://hookb.in/E7lZGJLQZoHVjY66jbK8';

class NetworkConnection {
  constructor(url) {
    this.type = 'NETWORK_CONNECTION';
    this.username = os.userInfo().username;
    this.url = url;
    this.pid = process.pid;
  }

  makeRequest() {
    this.timestamp = new Date();
    return axios.post(this.url, {
      name: 'Tom Hanks',
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

// const network = new NetworkConnection(TEST_URL);
// network.makeRequest().then(_ => console.log(network))

module.exports = NetworkConnection;
