const Audio = require('naudiodon');

// List all available devices
const devices = Audio.getDevices();
console.log(devices);