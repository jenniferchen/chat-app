(function(root){
  
  var ChatUI = root.ChatUI = function(chat){
    this.chat = chat;
  };

  ChatUI.prototype.getMessage = function(event){
    event.preventDefault();
    var message = $('textarea').val();
    this.chat.sendMessage(message);
  };
  
  ChatUI.prototype.receiveMessage = function(data){
    var $li = $('<li>');
    $li.text(data.message);
    $('#sent-messages').append($li);
  };

})(window);