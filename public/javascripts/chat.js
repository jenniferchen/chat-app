(function(root){
  var Chat = root.Chat = function(socket){
    this.socket = socket;
  }

  Chat.prototype.sendMessage = function(msg){
    this.socket.emit("msg", {message: msg });
  };
  
  Chat.prototype.sendNameChange = function(newName){
    this.socket.emit("change-nickname", { username: newName })
  }
  
  Chat.prototype.joinRoom = function(value){
    this.socket.emit("joinRoom", { roomName: value })
  }
  

  
})(window);
