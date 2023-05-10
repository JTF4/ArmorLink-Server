import express from "express";
import * as socketio from "socket.io";
import * as path from "path";
import * as Http from 'http';
import Debug from 'debug'

const debug = Debug('index')

const app = express();

let http = Http.Server(app);
// set up socket.io and bind it to our
// http server.
let io = new socketio.Server(http);

app.get("/", (req, res) => {
  res.send('Hello There!');
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function(socket) {
  debug('New device connected!')

  socket.on('device-init', (req, res) => {
    debug('Initializing New Device');

    let deviceObject = req;
    deviceObject.area = 'unassigned'
    deviceObject.channels = buildDeviceChannels(req.deviceSpec, req.id);
    deviceObject.socketID = socket.id;

    connectedDevices.push(deviceObject)

    res(deviceObject);

    console.log(JSON.stringify(connectedDevices, null, 4))

    console.log(ledChannels)

  })
  
  socket.on('ping', (req, res) => {
    debug('Got Ping!')
    socket.emit('pong');
    debug('Sending Pong!')
  })

  socket.conn.on('close', () => {
    debug('Device Disconnected. Clearing device info')

    let socketID = socket.id;

    let isSocketID = (obj) => {
        return obj.socketID === socketID
    }
    
    let connectedDeviceIndex = connectedDevices.findIndex(isSocketID);

    let disconnectedDevice = connectedDevices[connectedDeviceIndex];

    debug('Clearing from device list')
    connectedDevices.splice(connectedDeviceIndex, 1);

    debug('Cleaning LED Channels')
    
    for(let i = 0; i < disconnectedDevice.channels.ledChannels.length; i++) {
        let channel = disconnectedDevice.channels.ledChannels[i];
        ledChannels.splice(channel, 1);
    }

    console.log(ledChannels)

    console.log(connectedDeviceIndex)
  })
});


const server = http.listen(1170, function() {
  console.log("listening on *:1170");
});

let connectedDevices = [];


/* channel: {
    r:
    g:
    b:
}

*/

let ledChannels = [];

let capabilityArray = {
    helmet: {
        deviceId: null,
        deviceCapabilities: {
            ledChannels: 0,
            fanChannels: 0,
            atmosphericChannels: 0
        }
    },
    torso: {
        deviceId: null,
        deviceCapabilities: {
            ledChannels: 0,
            fanChannels: 0,
            atmosphericChannels: 0
        }
    },
    cod: {
        deviceId: null,
        deviceCapabilities: {
            ledChannels: 0,
            fanChannels: 0,
            atmosphericChannels: 0
        }
    },
    bicep: {
        left: {
            deviceId: null,
        deviceCapabilities: {
            ledChannels: 0,
            fanChannels: 0,
            atmosphericChannels: 0
        }
        },
        right: {
            deviceId: null,
        deviceCapabilities: {
            ledChannels: 0,
            fanChannels: 0,
            atmosphericChannels: 0
        }
        },
    },
    forearm: {
        left: {
            deviceId: null,
        deviceCapabilities: {
            ledChannels: 0,
            fanChannels: 0,
            atmosphericChannels: 0
        }
        },
        right: {
            deviceId: null,
        deviceCapabilities: {
            ledChannels: 0,
            fanChannels: 0,
            atmosphericChannels: 0
        }
        },
    },
    calf: {
        left: {
            deviceId: null,
        deviceCapabilities: {
            ledChannels: 0,
            fanChannels: 0,
            atmosphericChannels: 0
        }
        },
        right: {
            ledChannels: 0,
            fanChannels: 0,
            atmosphericChannels: 0
        },
    },
    shin: {
        left: {
            deviceId: null,
        deviceCapabilities: {
            ledChannels: 0,
            fanChannels: 0,
            atmosphericChannels: 0
        }
        },
        right: {
            deviceId: null,
        deviceCapabilities: {
            ledChannels: 0,
            fanChannels: 0,
            atmosphericChannels: 0
        }
        },
    },
    boot: {
        left: {
            deviceId: null,
        deviceCapabilities: {
            ledChannels: 0,
            fanChannels: 0,
            atmosphericChannels: 0
        }
        },
        right: {
            deviceId: null,
        deviceCapabilities: {
            ledChannels: 0,
            fanChannels: 0,
            atmosphericChannels: 0
        }
        },
    }

}

function buildDeviceChannels(capabilityArray, deviceID) {

    debug('Building Device Channels');

    let channelArray ={
        ledChannels: [],
        fanChannels: [],
        atmosphericChannels: []
    }

    for(let i = 0; i < capabilityArray.ledChannels; i++) {
        let channelNumber = createLedChannel(deviceID);

        channelArray.ledChannels[i] = channelNumber;
    }

    return channelArray;
}

function createLedChannel(deviceID) {

    debug('Creating LED Channel')

    let channelNumber = ledChannels.length

    ledChannels[channelNumber] = {
        id: deviceID,
        r: 0,
        g: 0,
        b: 0
    }

    return channelNumber;
}
