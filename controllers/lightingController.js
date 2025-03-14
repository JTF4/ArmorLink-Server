// In-memory state for lighting
let lightingState = {
    brightness: 100,
    color: '#FFFFFF',
    mode: 'static' // Options might include 'chase', 'pulse', etc.
  };
  
  exports.getLightingStatus = (req, res) => {
    res.json(lightingState);
  };
  
  exports.updateLighting = (req, res) => {
    const { brightness, color, mode } = req.body;
    if (brightness !== undefined) lightingState.brightness = brightness;
    if (color) lightingState.color = color;
    if (mode) lightingState.mode = mode;
  
    // In a full implementation, you might emit a Socket.IO event here:
    // io.emit('lighting-update', lightingState);
  
    res.json({ message: 'Lighting state updated', state: lightingState });
  };
  