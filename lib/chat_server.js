var socketio = require('socket.io');

var guestNum = 0;
var nicknames = {};
var currentRooms = {};
var roomlist = {};

function createChat (server) {
  var io = socketio(server);
  io.on('connection', function (socket) {
    guestNum++;
    nicknames[guestNum] = "Guest" + guestNum;
    socket.join("lobby", function(data){
      currentRooms[socket.id] = "lobby";
      io.sockets.to(currentRooms[socket.id]).emit('sent-msg', {
        username: nicknames[id], 
        message: "has joined room"
      });
    })
    

    socket.emit('roomlist', {roomlist: getRoomList()});
    var id = guestNum;
    socket.on('msg', function (data) {
      io.sockets.to(currentRooms[socket.id]).emit('sent-msg', {username: nicknames[id], message: data.message});
    });
    
    socket.on('disconnect', function(data){
      console.log("disconnected")
      io.sockets.to(currentRooms[socket.id]).emit('exit', {message: nicknames[id] + " has left"})
    });
    
    socket.on('joinRoom', function(data){
      var old = currentRooms[socket.id]
      socket.leave(old, function(){
        var idx = roomlist[old].indexOf(socket.id)
        roomlist[old].splice(idx, 1)
        io.sockets.to(old).emit('sent-msg', {
          username: nicknames[id], 
          message: "has left room"
        });
      });
      socket.join(data.roomName, function(){
        currentRooms[socket.id] = data.roomName;
        io.sockets.to(currentRooms[socket.id]).emit('sent-msg', {
          username: nicknames[id], 
          message: "has joined room " + data.roomName
        });
        io.sockets.emit('roomlist', {roomlist: getRoomList()} );
      });
      
    });

    socket.on('change-nickname', function(data){
      if (data.username.slice(0, 5) !== "guest") {
        var oldName = nicknames[id];
        nicknames[id] = data.username;
        io.sockets.in(currentRooms[socket.id]).emit('sent-msg', {
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
    });
    

  });
}

function getRoomList(){
  console.log(Object.keys(currentRooms))
  Object.keys(currentRooms).forEach(function(user){
    if (roomlist[currentRooms[user]]) {
      roomlist[currentRooms[user]].push(user);
      // roomlist[currentRooms[user]].unique()
    } else {
      roomlist[currentRooms[user]] = [user]; 
    }
  })
  console.log(roomlist)
  return roomlist;
}



module.exports.createChat = createChat;