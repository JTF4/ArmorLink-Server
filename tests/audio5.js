const portAudio = require('naudiodon');

// List available devices to select specific input/output devices
const devices = portAudio.getDevices();
console.log(devices);  // Use this to find your device IDs

// Example: Select device IDs based on the list
const inputDeviceId = 0;   // Replace this with the actual ID of your microphone
const outputDeviceId = 7;  // Replace this with the actual ID of your speaker

const ai = new portAudio.AudioIO({
    inOptions: {
      channelCount: 1,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 16000,           // Sample rate in Hz
      framesPerBuffer: 128,       // Increase buffer size to prevent overflow
      deviceId: inputDeviceId,                 // ID of your input device
      closeOnError: true
    }
  });
  

  const ao = new portAudio.AudioIO({
    outOptions: {
      channelCount: 1,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 16000,           // Match input sample rate
      framesPerBuffer: 128,       // Increase buffer size
      deviceId: outputDeviceId,                 // ID of your output device
      closeOnError: true
    }
  });
  

// Pipe the input directly to the output
ai.pipe(ao);

// Start the streams
ai.start();
ao.start();

console.log('Microphone is now routed to the speaker');
