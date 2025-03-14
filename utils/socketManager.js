// utils/socketManager.js
let io = null;

module.exports = {
  setIO: (socketIO) => {
    io = socketIO;
  },
  getIO: () => io
};
