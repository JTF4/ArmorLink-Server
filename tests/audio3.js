const portAudio = require('naudiodon');

// List available devices to select specific input/output devices
const devices = portAudio.getDevices();
console.log(devices);  // Use this to find your device IDs

// Example: Select device IDs based on the list
const inputDeviceId = 0;   // Replace this with the actual ID of your microphone
const outputDeviceId = 7;  // Replace this with the actual ID of your speaker

// Compressor parameters
let threshold = 0.2;  // Compress sounds louder than this (between 0.0 and 1.0)
let ratio = 4.0;      // Compression ratio (4:1 means reduce 4dB to 1dB)
let attackTime = 0.01;  // Attack time in seconds
let releaseTime = 0.1;  // Release time in seconds

let envelope = 0;  // Used to track the current signal level over time

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

// Function to apply dynamic compression
function applyCompression(inputBuffer, threshold, ratio, attackTime, releaseTime) {
  const outputBuffer = new Float32Array(inputBuffer.length);
  const attackCoeff = Math.exp(-1 / (16000 * attackTime));    // Calculate attack coefficient
  const releaseCoeff = Math.exp(-1 / (16000 * releaseTime));  // Calculate release coefficient

  for (let i = 0; i < inputBuffer.length; i++) {
    // Calculate the signal level (absolute value)
    const inputLevel = Math.abs(inputBuffer[i]);

    // Update the envelope with attack/release behavior
    if (inputLevel > envelope) {
      envelope = attackCoeff * (envelope - inputLevel) + inputLevel;
    } else {
      envelope = releaseCoeff * (envelope - inputLevel) + inputLevel;
    }

    // Apply compression if the envelope exceeds the threshold
    if (envelope > threshold) {
      const gainReduction = 1 - (1 / ratio) * (envelope - threshold) / envelope;
      outputBuffer[i] = inputBuffer[i] * gainReduction;
    } else {
      outputBuffer[i] = inputBuffer[i];  // No compression below threshold
    }
  }

  return outputBuffer;
}

// Apply compression on the audio stream
ai.on('data', (audioData) => {
  // Convert input audio buffer to floating-point format
  const int16Array = new Int16Array(audioData.buffer);
  const floatData = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    floatData[i] = int16Array[i] / 32768;  // Convert 16-bit PCM to float (-1.0 to 1.0)
  }

  // Apply dynamic range compression to the audio data
  const compressedData = applyCompression(floatData, threshold, ratio, attackTime, releaseTime);

  // Convert the compressed float buffer back to a 16-bit integer buffer for output
  const outputBuffer = Buffer.alloc(compressedData.length * 2);
  for (let i = 0; i < compressedData.length; i++) {
    const value = Math.max(-1, Math.min(1, compressedData[i]));  // Clamp values between -1 and 1
    outputBuffer.writeInt16LE(value * 32767, i * 2);  // Convert float back to 16-bit PCM
  }

  ao.write(outputBuffer);  // Write the modified buffer to the speaker output
});

// Start the streams
ai.start();
ao.start();

console.log('Microphone is now routed to the speaker with dynamic compression.');
