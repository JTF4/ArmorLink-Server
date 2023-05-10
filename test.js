// ES modules
import { io } from "socket.io-client";

const socket = io.connect('http://localhost:1170');

let deviceCapabilities = {
    ledChannels: 4,
    fanChannels: 3,
    atmosphericChannels: 0
}
let deviceName = 'Helmet Controller'
let deviceID = '1h87d6'

let deviceInfo = {
    deviceSpec: deviceCapabilities,
    name: deviceName,
    id: deviceID
}

let ledChannelMap = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
}

let ledMatrix = {
    1: {
        r: 0,
        g: 0,
        b: 0
    },
    2: {
        r: 0,
        g: 0,
        b: 0
    },
    3: {
        r: 0,
        g: 0,
        b: 0
    },
    4: {
        r: 0,
        g: 0,
        b: 0
    }
}

socket.on("connect", () => {
    console.log(socket.connected); // true
    
    socket.emit('device-init', deviceInfo, (cb) => {
        
        console.log(cb)

        ledChannelMap[1] = cb.channels.ledChannels[0]
        ledChannelMap[2] = cb.channels.ledChannels[1]
        ledChannelMap[3] = cb.channels.ledChannels[2]
        ledChannelMap[4] = cb.channels.ledChannels[3]

        console.log(ledChannelMap)

    })
    
    
    socket.on('led-update', (ledChannels) => {
        console.log(ledChannels)
        
        ledMatrix[1] = ledChannels[ledChannelMap[1]]
        ledMatrix[2] = ledChannels[ledChannelMap[2]]
        ledMatrix[3] = ledChannels[ledChannelMap[3]]
        ledMatrix[4] = ledChannels[ledChannelMap[4]]

    })
    
    socket.on('ping', (req, res) => {
        console.log('Got Ping!')
        socket.emit('Pong!');
        console.log('Sent Pong!')
    })
});