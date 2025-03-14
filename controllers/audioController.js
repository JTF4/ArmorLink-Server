// In-memory state for audio
let audioState = {
    volume: 50,
    effects: [],
    micStatus: 'active'
  };
  
  exports.getAudioStatus = (req, res) => {
    res.json(audioState);
  };
  
  exports.updateAudio = (req, res) => {
    const { volume, effects, micStatus } = req.body;
    if (volume !== undefined) audioState.volume = volume;
    if (effects) audioState.effects = effects;
    if (micStatus) audioState.micStatus = micStatus;
  
    // Emit real-time update if needed:
    // io.emit('audio-update', audioState);
  
    res.json({ message: 'Audio state updated', state: audioState });
  };
  