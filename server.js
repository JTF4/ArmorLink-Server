const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const socketIo = require('socket.io');

// Import routes and socket handler
const apiRoutes = require('./routes/api');
const { registerSocketHandlers } = require('./socket/socketHandler');
const socketManager = require('./utils/socketManager');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// REST API Routes
app.use('/api', apiRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('ArmorLink Server Running');
});

// Set up Socket.IO with CORS (adjust in production as needed)
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
socketManager.setIO(io);

// Register real-time socket events
registerSocketHandlers(io);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`ArmorLink server listening on port ${PORT}`);
});
