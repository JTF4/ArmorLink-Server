const portAudio = require('naudiodon');

// List available devices to select specific input/output devices
const devices = portAudio.getDevices();
console.log(devices);  // Use this to find your device IDs

// Example: Select device IDs based on the list
const inputDeviceId = 0;   // Replace this with the actual ID of your microphone
const outputDeviceId = 7;  // Replace this with the actual ID of your speaker

// Create the audio input stream (microphone)
const ai = new portAudio.AudioIO({
    inOptions: {
      channelCount: 1,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 16000,           // Sample rate in Hz
      framesPerBuffer: 128,        // Buffer size to prevent overflow
      deviceId: inputDeviceId,     // ID of your input device
      closeOnError: true
    }
  });

// Create the audio output stream (speaker)
const ao = new portAudio.AudioIO({
    outOptions: {
      channelCount: 1,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 16000,           // Match input sample rate
      framesPerBuffer: 128,        // Buffer size
      deviceId: outputDeviceId,    // ID of your output device
      closeOnError: true
    }
  });

// Pitch shift factor
let pitchShiftFactor = 0.95;  // < 1.0 lowers pitch, > 1.0 raises pitch

// Linear interpolation for resampling
function interpolate(input, newLength) {
  const output = new Float32Array(newLength);
  const stretchFactor = input.length / newLength;

  for (let i = 0; i < newLength; i++) {
    const originalIndex = i * stretchFactor;
    const beforeIndex = Math.floor(originalIndex);
    const afterIndex = Math.ceil(originalIndex);
    const weight = originalIndex - beforeIndex;

    // Linear interpolation
    output[i] = input[beforeIndex] * (1 - weight) + input[afterIndex] * weight;
  }
  return output;
}

// Apply pitch shifting and interpolation on the audio stream
ai.on('data', (audioData) => {
  // Convert input audio buffer to floating-point format
  const int16Array = new Int16Array(audioData.buffer);
  const floatData = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    floatData[i] = int16Array[i] / 32768;  // Convert 16-bit PCM to float (-1.0 to 1.0)
  }

  // Resample the audio data to apply pitch shift
  const newLength = Math.floor(floatData.length / pitchShiftFactor);  // Adjust length based on pitch factor
  const shiftedData = interpolate(floatData, newLength);

  // Convert the processed float buffer back to a 16-bit integer buffer for output
  const outputBuffer = Buffer.alloc(shiftedData.length * 2);
  for (let i = 0; i < shiftedData.length; i++) {
    const value = Math.max(-1, Math.min(1, shiftedData[i]));  // Clamp values between -1 and 1
    outputBuffer.writeInt16LE(value * 32767, i * 2);  // Convert float back to 16-bit PCM
  }

  ao.write(outputBuffer);  // Write the modified buffer to the speaker output
});

// Start the streams
ai.start();
ao.start();

console.log('Microphone is now routed to the speaker with basic pitch shifting.');
