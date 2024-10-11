const portAudio = require('naudiodon');
const fs = require('fs');
const wav = require('wav-decoder');  // To read WAV files
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

const targetSampleRate = 16000;  // Sample rate we want for playback

// Compressor parameters
let threshold = 0.2;
let ratio = 4.0;
let attackTime = 0.01;
let releaseTime = 0.1;
let envelope = 0;
let isMuted = false;
let sfxBuffer = null;

// Sound effects list
const soundEffects = [
  'tests/test.wav',
  'tests/test2.wav',
  'tests/test3.wav',
  'tests/test4.wav',
  'tests/test5.wav'
];

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

// Function to resample audio data
function resampleAudio(inputBuffer, inputSampleRate, targetSampleRate) {
  const resampleRatio = targetSampleRate / inputSampleRate;
  const outputLength = Math.floor(inputBuffer.length * resampleRatio);
  const outputBuffer = new Float32Array(outputLength);

  for (let i = 0; i < outputLength; i++) {
    const srcIndex = i / resampleRatio;
    const srcIndexInt = Math.floor(srcIndex);
    const srcIndexNext = Math.min(srcIndexInt + 1, inputBuffer.length - 1);
    const fraction = srcIndex - srcIndexInt;

    outputBuffer[i] = (1 - fraction) * inputBuffer[srcIndexInt] + fraction * inputBuffer[srcIndexNext];
  }

  return outputBuffer;
}

// Function to load and decode a WAV file, resampling if necessary
async function loadSoundEffect(file) {
  const fileData = fs.readFileSync(file);
  const decoded = await wav.decode(fileData);
  const { sampleRate, channelData } = decoded;
  
  // If sample rates don't match, resample the audio data
  let floatData = channelData[0];
  if (sampleRate !== targetSampleRate) {
    console.log(`Resampling sound effect from ${sampleRate}Hz to ${targetSampleRate}Hz`);
    floatData = resampleAudio(floatData, sampleRate, targetSampleRate);
  } else {
    console.log(`Sound effect is already at ${targetSampleRate}Hz`);
  }

  // Convert float32 buffer to 16-bit PCM for playback
  const outputBuffer = Buffer.alloc(floatData.length * 2);
  for (let i = 0; i < floatData.length; i++) {
    const value = Math.max(-1, Math.min(1, floatData[i]));  // Clamp values between -1 and 1
    outputBuffer.writeInt16LE(value * 32767, i * 2);  // Convert float back to 16-bit PCM
  }

  return outputBuffer;
}

// Function to mix audio data (mic + sfx)
function mixAudio(micData, sfxData) {
  const mixLength = Math.min(micData.length, sfxData ? sfxData.length : 0);
  const output = Buffer.alloc(micData.length);  // Allocate buffer for final output

  for (let i = 0; i < micData.length; i += 2) {
    const micSample = micData.readInt16LE(i);
    const sfxSample = sfxData && i < sfxData.length ? sfxData.readInt16LE(i) : 0;

    let mixedSample = micSample + sfxSample;
    mixedSample = Math.max(-32768, Math.min(32767, mixedSample));  // Clamp

    output.writeInt16LE(mixedSample, i);
  }

  return output;
}

// Apply compression and handle mute/unmute
const ai = new portAudio.AudioIO({
  inOptions: {
    channelCount: 1,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: targetSampleRate,
    framesPerBuffer: 128,
    deviceId: inputDeviceId,
    closeOnError: true
  }
});

const ao = new portAudio.AudioIO({
  outOptions: {
    channelCount: 1,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: targetSampleRate,
    framesPerBuffer: 128,
    deviceId: outputDeviceId,
    closeOnError: true
  }
});

ai.on('data', (audioData) => {
  if (isMuted) return;

  const int16Array = new Int16Array(audioData.buffer);
  const floatData = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    floatData[i] = int16Array[i] / 32768;
  }

  const compressedData = applyCompression(floatData, threshold, ratio, attackTime, releaseTime);

  const outputBuffer = Buffer.alloc(compressedData.length * 2);
  for (let i = 0; i < compressedData.length; i++) {
    outputBuffer.writeInt16LE(Math.max(-1, Math.min(1, compressedData[i])) * 32767, i * 2);
  }

  const mixedBuffer = mixAudio(outputBuffer, sfxBuffer);
  ao.write(mixedBuffer);

  if (sfxBuffer) {
    sfxBuffer = sfxBuffer.slice(outputBuffer.length);
    if (sfxBuffer.length === 0) {
      sfxBuffer = null;
    }
  }
});

async function playSoundEffect(index) {
  try {
    sfxBuffer = await loadSoundEffect(soundEffects[index]);
    console.log(`Playing sound effect: ${soundEffects[index]}`);
  } catch (err) {
    console.error('Error loading sound effect:', err);
  }
}

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
    playSoundEffect(sfxIndex);
  } else if (key.sequence === '\u0003') {  // Ctrl+C to exit
    console.log('Exiting...');
    ai.quit();
    ao.quit();
    process.exit();
  }
});

console.log('Microphone routing with dynamic compression, mute/unmute, sound effects, and resampling is active.');
