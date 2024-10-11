var portAudio = require('naudiodon');
const { buffer } = require('stream/consumers');

console.log(portAudio.getDevices());

var ao = new portAudio.AudioIO({
    outOptions: {
      channelCount: 1,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 48000,
      deviceId: 7, // Use -1 or omit the deviceId to select the default device
      closeOnError: true // Close the stream if an audio error is detected, if set false then just log the error
    }
  });

var ai = new portAudio.AudioIO({
    inOptions: {
      channelCount: 1,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 48000,
      deviceId: 0, // Use -1 or omit the deviceId to select the default device
      closeOnError: true // Close the stream if an audio error is detected, if set false then just log the error
    }
  });

ai.pipe(ao);
ao.start();
ai.start();