const portAudio = require('naudiodon');
const fs = require('fs');
const readline = require('readline');

// For detecting key presses (mute/unmute and sound effects)
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// List available devices to select specific input/output devices
const devices = portAudio.getDevices();
console.log(devices);  // Use this to find your device IDs

// Example: Select device IDs based on the list
const inputDeviceId = 0;   // Replace this with the actual ID of your microphone
const outputDeviceId = 7;  // Replace this with the actual ID of your speaker

// Compressor parameters
let threshold = 0.2;
let ratio = 4.0;
let attackTime = 0.01;
let releaseTime = 0.1;
let envelope = 0;
let isMuted = false;
let isTalking = false;  // Track if the user is currently talking
let silenceThreshold = 1;
let silenceDuration = 3000;  // 3 seconds of silence before triggering SFX
let silenceTimer = null;

// Load sound effects
const soundEffects = [
  'tests/test.wav',
  'tests/test.wav',
  'tests/test.wav',
  'tests/test.wav',
  'tests/test.wav'
];

// Function to play a sound effect from a file
function playSoundEffect(file) {
  const sfxStream = fs.createReadStream(file);
  sfxStream.pipe(ao);  // Play through the same speaker output
}

// Function to apply dynamic compression
function applyCompression(inputBuffer, threshold, ratio, attackTime, releaseTime) {
  const outputBuffer = new Float32Array(inputBuffer.length);
  const attackCoeff = Math.exp(-1 / (16000 * attackTime)); 
  const releaseCoeff = Math.exp(-1 / (16000 * releaseTime)); 

  for (let i = 0; i < inputBuffer.length; i++) {
    const inputLevel = Math.abs(inputBuffer[i]);
    if (inputLevel > envelope) {
      envelope = attackCoeff * (envelope - inputLevel) + inputLevel;
    } else {
      envelope = releaseCoeff * (envelope - inputLevel) + inputLevel;
    }

    if (envelope > threshold) {
      const gainReduction = 1 - (1 / ratio) * (envelope - threshold) / envelope;
      outputBuffer[i] = inputBuffer[i] * gainReduction;
    } else {
      outputBuffer[i] = inputBuffer[i];
    }
  }

  return outputBuffer;
}

// Create the audio input stream (microphone)
const ai = new portAudio.AudioIO({
  inOptions: {
    channelCount: 1,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 16000,
    framesPerBuffer: 128,
    deviceId: inputDeviceId,
    closeOnError: true
  }
});

// Create the audio output stream (speaker)
const ao = new portAudio.AudioIO({
  outOptions: {
    channelCount: 1,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 16000,
    framesPerBuffer: 128,
    deviceId: outputDeviceId,
    closeOnError: true
  }
});

// Apply compression and handle mute/unmute
ai.on('data', (audioData) => {
  if (isMuted) return;

  const int16Array = new Int16Array(audioData.buffer);
  const floatData = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    floatData[i] = int16Array[i] / 32768;
  }

  const compressedData = applyCompression(floatData, threshold, ratio, attackTime, releaseTime);

  // Check if the audio is below the silence threshold
  const avgVolume = compressedData.reduce((sum, value) => sum + Math.abs(value), 0) / compressedData.length;

  if (avgVolume < silenceThreshold) {
    if (isTalking) {
      // Transition from talking to silence
      if (!silenceTimer) {
        silenceTimer = setTimeout(() => {
          console.log('Silence detected. Playing sound effect.');
          playSoundEffect('silence_sfx.wav');  // Play the effect after silence
          silenceTimer = null;
        }, silenceDuration);
      }
      isTalking = false;
    }
  } else {
    // Talking detected
    if (silenceTimer) {
      clearTimeout(silenceTimer);
      silenceTimer = null;
    }
    isTalking = true;  // We're talking now
  }

  const outputBuffer = Buffer.alloc(compressedData.length * 2);
  for (let i = 0; i < compressedData.length; i++) {
    outputBuffer.writeInt16LE(Math.max(-1, Math.min(1, compressedData[i])) * 32767, i * 2);
  }

  ao.write(outputBuffer);
});

// Start the streams
ai.start();
ao.start();

// Handle keypress events for mute/unmute and sound effects
process.stdin.on('keypress', (str, key) => {
  if (key.name === 'm') {
    isMuted = true;
    console.log('Microphone muted.');
  } else if (key.name === 'u') {
    isMuted = false;
    console.log('Microphone unmuted.');
  } else if (key.name >= '1' && key.name <= '5') {
    const sfxIndex = parseInt(key.name) - 1;
    console.log(`Playing sound effect ${key.name}`);
    playSoundEffect(soundEffects[sfxIndex]);
  } else if (key.sequence === '\u0003') {  // Ctrl+C to exit
    console.log('Exiting...');
    ai.quit();
    ao.quit();
    process.exit();
  }
});

console.log('Microphone routing with dynamic compression, mute/unmute, and sound effects is active.');
