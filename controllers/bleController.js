// In-memory state for BLE tags
let bleState = {
    tags: [] // Array of tag objects (e.g., { id, type, distance, friendOrFoe })
  };
  
  exports.getBLEStatus = (req, res) => {
    res.json(bleState);
  };
  
  exports.updateBLE = (req, res) => {
    const { tags } = req.body;
    if (tags) bleState.tags = tags;
  
    // Emit real-time update if needed:
    // io.emit('ble-update', bleState);
  
    res.json({ message: 'BLE state updated', state: bleState });
  };
  