function registerSocketHandlers(io) {
    io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`);
  
       // Allow modules to join a room based on their type (e.g., armor, weapon)
    socket.on('join-room', (room) => {
      console.log(`Socket ${socket.id} joining room: ${room}`);
      socket.join(room);
    });

    // Handle lighting commands sent by the tacpad or other controllers
    socket.on('lighting-command', (data) => {
      // Validate that the command includes required fields
      const { target, command, params } = data;
      if (!target || !command) {
        console.error('Invalid lighting command received:', data);
        return;
      }
      console.log(`Received lighting command for ${target}:`, command, params);

      // Use rooms to target specific groups; 'all' broadcasts to every connected client
      if (target === 'all') {
        io.emit('lighting-command', data);
      } else {
        io.to(target).emit('lighting-command', data);
      }
    });
  
      // Audio update event
      socket.on('update-audio', (data) => {
        console.log('Received audio update:', data);
        socket.broadcast.emit('audio-update', data);
      });
  
      // Atmospherics update event
      socket.on('update-atmospherics', (data) => {
        console.log('Received atmospherics update:', data);
        socket.broadcast.emit('atmospherics-update', data);
      });
  
      // BLE update event
      socket.on('update-ble', (data) => {
        console.log('Received BLE update:', data);
        socket.broadcast.emit('ble-update', data);
      });
  
      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });
  }
  
  module.exports = { registerSocketHandlers };
  