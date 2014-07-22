var socketio = require('socket.io');

function createChat (server) {
  var io = socketio(server);
  io.on('connection', function (socket) {
    console.log("new connection!");
    socket.on('msg', function (data) {
      io.sockets.emit('sent-msg', {message: data.message});
    });
  });
}

module.exports.createChat = createChat;