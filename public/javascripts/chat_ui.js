(function(root){
  
  var ChatUI = root.ChatUI = function(chat){
    this.chat = chat;
  };

  ChatUI.prototype.getMessage = function(event){
    event.preventDefault();
    var message = $('textarea').val();
    if (message.slice(0,5) === "/name"){
      this.nameChange(message.slice(6));
    } else {
      this.chat.sendMessage(message);      
    }
  };
  
  ChatUI.prototype.receiveMessage = function(data){
    var username = data.username;
    var message = data.message;
    var $li = $('<li>');
    $li.text(username + ": " + message);
    $('#sent-messages').append($li);
  };
  
  ChatUI.prototype.receiveID = function(data){
    this.id = data.message;
    console.log(this.id);
  }
  
  ChatUI.prototype.exit = function(data){
    var $li = $('<li>');
    $li.text(data.message);
    $('#sent-messages').append($li);
  }
  
  ChatUI.prototype.nameChange = function(newName){
    this.chat.sendNameChange(newName);
  }
})(window);