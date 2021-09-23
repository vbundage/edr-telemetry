const os = require('os');
const axios = require('axios');

class Network {
  constructor(url) {
    this.type = 'NETWORK';
    this.username = os.userInfo().username;
    this.url = url;
  }
}

axios.post('https://hookb.in/RZ11nZRD2GhNb9zzbOVr', {
  name: 'John',
}).then(response => {
  console.log(response.request.protocol);
})

/*
response.request.getHeader('Content-Length'),
response.request.socket.localAddress,
response.request.socket.localPort,
response.request.socket.remoteAddress,
response.request.socket.remotePort
*/

module.exports = Network;
