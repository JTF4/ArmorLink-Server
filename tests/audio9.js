const portAudio = require('naudiodon');
const fs = require('fs');
const wav = require('wav-decoder');
const readline = require('readline');

// For detecting key presses (mute/unmute, voice modification)
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// List available devices to select specific input/output devices
const devices = portAudio.getDevices();
console.log(devices);  // Use this to find your device IDs

// Example: Select device IDs based on the list
const inputDeviceId = 0;   // Replace this with the actual ID of your microphone
const outputDeviceId = 7;  // Replace this with the actual ID of your speaker

const targetSampleRate = 16000;  // Sample rate we want for playback

// Define compression settings
const threshold = 0.2;  // Compression threshold
const ratio = 4.0;  // Compression ratio
const attackTime = 0.01;  // Attack time in seconds
const releaseTime = 0.1;  // Release time in seconds

let isMuted = false;
let isTalking = false;
let silenceTimer = null;
let radioClickPlayed = false;
let sfxPlaying = false;
let enableLogging = true;
let afterTalkEnabled = true;  // Switch to enable/disable after-talk SFX
let voiceModEnabled = false;  // Switch to enable/disable voice modification (Master Chief)

// Path to the after-talk SFX file
const radioClickPath = 'tests/radioClick.wav';

// Function to apply dynamic compression
function applyCompression(inputBuffer, threshold, ratio, attackTime, releaseTime) {
  const outputBuffer = new Float32Array(inputBuffer.length);
  const attackCoeff = Math.exp(-1 / (16000 * attackTime));
  const releaseCoeff = Math.exp(-1 / (16000 * releaseTime));
  let envelope = 0;

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

// Function to manually apply a more subtle pitch shift (Lower the pitch slightly)
function pitchShiftDown(inputBuffer, shiftFactor = 0.85) {
  const outputLength = Math.floor(inputBuffer.length * shiftFactor);
  const outputBuffer = new Float32Array(outputLength);

  for (let i = 0; i < outputLength; i++) {
    const srcIndex = i / shiftFactor;
    const srcIndexInt = Math.floor(srcIndex);
    const srcIndexNext = Math.min(srcIndexInt + 1, inputBuffer.length - 1);
    const fraction = srcIndex - srcIndexInt;

    outputBuffer[i] = (1 - fraction) * inputBuffer[srcIndexInt] + fraction * inputBuffer[srcIndexNext];
  }

  return outputBuffer;
}

// Function to manually apply distortion (metallic helmet effect)
function applyDistortion(inputBuffer, distortionLevel = 3.0) {
  return inputBuffer.map(sample => Math.tanh(sample * distortionLevel));
}

// Function to apply a simple reverb (echo effect)
function applyReverb(inputBuffer, delaySamples = 500, decay = 0.4) {
  const outputBuffer = new Float32Array(inputBuffer.length);

  for (let i = 0; i < inputBuffer.length; i++) {
    outputBuffer[i] = inputBuffer[i];
    if (i >= delaySamples) {
      outputBuffer[i] += inputBuffer[i - delaySamples] * decay;
    }
  }

  return outputBuffer;
}

// Function to apply EQ for a helmet-like effect (boost lows, reduce mids/highs)
function applyEQ(inputBuffer) {
  const outputBuffer = new Float32Array(inputBuffer.length);
  for (let i = 0; i < inputBuffer.length; i++) {
    const freq = i % 1024; // Simulate frequency spectrum (low index = low freq, high index = high freq)

    // Boost lower frequencies (simulate a bass boost)
    if (freq < 200) {
      outputBuffer[i] = inputBuffer[i] * 1.5;  // Boost low frequencies
    }
    // Attenuate mid-high frequencies
    else if (freq > 500 && freq < 2000) {
      outputBuffer[i] = inputBuffer[i] * 0.75;  // Cut mids for clarity
    } else {
      outputBuffer[i] = inputBuffer[i];
    }
  }
  return outputBuffer;
}

// Function to apply voice modification (Master Chief effect)
function applyVoiceModification(inputBuffer) {
  // Step 1: Subtly lower the pitch
  let processedBuffer = pitchShiftDown(inputBuffer, 1.03);

  // Step 2: Apply distortion (helmet effect)
  processedBuffer = applyDistortion(processedBuffer, 1.0);

  // Step 3: Apply light reverb
  processedBuffer = applyReverb(processedBuffer, 500, 0.4);

  // Step 4: Apply EQ for a deeper, helmet-like tone
  processedBuffer = applyEQ(processedBuffer);

  return processedBuffer;
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

// Ensure audio streams are started
ai.start();
ao.start();

ai.on('data', (audioData) => {
  if (isMuted || sfxPlaying) return;  // Ignore data if muted or SFX is playing

  const int16Array = new Int16Array(audioData.buffer);
  const floatData = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    floatData[i] = int16Array[i] / 32768;
  }

  let processedData;
  if (voiceModEnabled) {
    // Apply Master Chief voice modification
    processedData = applyVoiceModification(floatData);
  } else {
    // Apply regular compression
    processedData = applyCompression(floatData, threshold, ratio, attackTime, releaseTime);
  }

  const outputBuffer = Buffer.alloc(processedData.length * 2);
  for (let i = 0; i < processedData.length; i++) {
    outputBuffer.writeInt16LE(Math.max(-1, Math.min(1, processedData[i])) * 32767, i * 2);
  }

  ao.write(outputBuffer);
});

// Handle keypress events for mute/unmute, voice modification toggle, and after-talk SFX toggle
process.stdin.on('keypress', (str, key) => {
  if (key.name === 'm') {
    isMuted = true;
    console.log('Microphone muted.');
  } else if (key.name === 'u') {
    isMuted = false;
    console.log('Microphone unmuted.');
  } else if (key.name === 'v') {
    voiceModEnabled = !voiceModEnabled;
    console.log(`Voice modification ${voiceModEnabled ? 'enabled' : 'disabled'}.`);
  } else if (key.name === 'a') {
    afterTalkEnabled = !afterTalkEnabled;
    console.log(`After-talk SFX ${afterTalkEnabled ? 'enabled' : 'disabled'}.`);
  } else if (key.sequence === '\u0003') {  // Ctrl+C to exit
    console.log('Exiting...');
    ai.quit();
    ao.quit();
    process.exit();
  }
});

console.log('Microphone routing with compression, after-talk SFX, and voice modification is active. Press "m" to mute, "u" to unmute, "v" to toggle voice modification, and "a" to toggle after-talk SFX.');
