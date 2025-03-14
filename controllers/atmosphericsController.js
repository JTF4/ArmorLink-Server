// In-memory state for atmospherics
let atmosphericsState = {
    smoke: false,
    geyser: false,
    intensity: 0
  };
  
  exports.getAtmosphericsStatus = (req, res) => {
    res.json(atmosphericsState);
  };
  
  exports.updateAtmospherics = (req, res) => {
    const { smoke, geyser, intensity } = req.body;
    if (smoke !== undefined) atmosphericsState.smoke = smoke;
    if (geyser !== undefined) atmosphericsState.geyser = geyser;
    if (intensity !== undefined) atmosphericsState.intensity = intensity;
  
    // Optionally emit a real-time event:
    // io.emit('atmospherics-update', atmosphericsState);
  
    res.json({ message: 'Atmospherics state updated', state: atmosphericsState });
  };
  