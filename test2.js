// ES modules
import { io } from "socket.io-client";

const socket = io.connect('http://localhost:1170');

let deviceCapabilities = {
    ledChannels: 2,
    fanChannels: 0,
    atmosphericChannels: 0
}
let deviceName = 'Thigh Controller'
let deviceID = '1h87h6'

let deviceInfo = {
    deviceSpec: deviceCapabilities,
    name: deviceName,
    id: deviceID
}

socket.on("connect", () => {
    console.log(socket.connected); // true
    
    socket.emit('device-init', deviceInfo, (cb) => {
        console.log('Sent device info and got' + cb);
    })
    
    
    
    
    socket.on('ping', (req, res) => {
        console.log('Got Ping!')
        socket.emit('Pong!');
        console.log('Sent Pong!')
    })
});