var socketio = require('socket.io');

var guestNum = 0;
var nicknames = {};

function createChat (server) {
  var io = socketio(server);
  io.on('connection', function (socket) {
    guestNum++;
    nicknames[guestNum] = "Guest" + guestNum;
    var id = guestNum;
    socket.on('msg', function (data) {
      io.sockets.emit('sent-msg', {username: nicknames[id], message: data.message});
    });
    
    socket.on('disconnect', function(data){
      console.log("disconnected")
      console.log(data)
      io.sockets.emit('exit', {message: nicknames[id] + " has left"})
    })
    
    socket.on('change-nickname', function(data){
      if (data.username.slice(0, 5) !== "guest") {
        var oldName = nicknames[id];
        nicknames[id] = data.username;
        io.sockets.emit('sent-msg', {
          success: true,
          username: oldName,
          message: "is now " + data.username
        });
      } else {
        socket.emit('sent-msg', {
          success: false,
          username: nicknames[id],
          message: "Username cannot start with guest"
        });
      }
    })
  });
}



module.exports.createChat = createChat;