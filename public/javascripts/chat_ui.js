(function(root){
  
  var ChatUI = root.ChatUI = function(chat){
    this.chat = chat;
    this.messageCount = 0;
  };

  ChatUI.prototype.getMessage = function(event){
    event.preventDefault();
    var message = $('.form-control').val();
    if (message.slice(0,1) === "/"){
      this.commandParse(message.slice(1));
    } else {
      this.chat.sendMessage(message);      
    }
    $('form')[0].reset();
  };
  
  ChatUI.prototype.receiveMessage = function(data){
    var username = data.username;
    var message = data.message;
    this.messageCount++;
    var $li = $('<li>');
    $li.attr("id", this.messageCount);
    $li.text(username + ": " + message);
    $('#sent-messages').append($li);
    $('#message-box')[0].scrollTop = $('#message-box')[0].scrollHeight;
  };
  
  ChatUI.prototype.receiveID = function(data){
    this.id = data.message;
  };
  
  ChatUI.prototype.exit = function(data){
    var $li = $('<li>');
    $li.text(data.message);
    $('#sent-messages').append($li);
  };
  
  ChatUI.prototype.commandParse = function(message){
    var parsedMsg = message.split(" ");
    var command = parsedMsg[0];
    var value = parsedMsg[1];
    
    switch (command){
      case "name":
        this.chat.sendNameChange(value);
        break;
      case "join":
        this.chat.joinRoom(value);
        $('.room-name').text(value);
        break;
      default:
        var $li = $('<li>');
        $li.text("Command not recognized");
        $('#sent-messages').append($li);
        break;
    }   
  };
  
  ChatUI.prototype.renderRoomList = function(data){
    var that = this;
    var roomlist = data.roomlist
    $('.roomlist').empty();
    Object.keys(roomlist).forEach(function(room){
      $('.roomlist').append("<li class='room-name'>" + room + "</li>")
    })
    $('.room-name').on("click", function(event){
      that.chat.joinRoom($(event.currentTarget).text());
    });
  }
})(window);