Slick.Views.MessageForm = Backbone.CompositeView.extend({

  template: JST['messages/form'],
  tagName: "div",
  className: "input-area",

  events: {
    "keydown textarea": "handleKeydown"
  },

  initialize: function(options) {
    this.conversationFeed = options.conversationFeed;
    this.users = options.users;
    this.conversation = options.conversation;
    this.model = new Slick.Models.Message({},{
      conversation: this.conversation
    });
  },

  render: function() {
    var content = this.template({
      message: this.model,
      callbackId: this.callbackId
    });
    this.$el.html(content);
    return this;
  },

  handleKeydown: function (event) {
    this.isTyping();

    // ignores shift+return
    if (!event.shiftKey && event.keyCode == 13) {
      event.preventDefault();
      $input = $('#chat-input');
      var content = $input.val();
      $input.val("");

      if (this.isValidMessage(content)) {
        this.sendMessage(content);
      } else {
        // invalid msg prompt?
        console.log('invalid msg');
      }
    }
  },


  // may have to be modular for switch from ajax
  sendMessage: function(content) {
    var socketId = window.pusher.connection.socket_id;
    this.model = new Slick.Models.Message({
      content: content
    },
    {
      conversation: this.conversation
    });
    this.model.set("sender_id", Slick.Models.currentUser.get('id'));
    this.model.set("socket_id", socketId);
    this.model.save({},{
    });
    this.pendMessage();
  },

  pendMessage: function () {
    this.users.add(Slick.Models.currentUser);
    this.conversation.messages().add(this.model);
  },

  isValidMessage: function (user_input) {
    return user_input.length > 0 && user_input.length < 30000;
  },

  isTyping: function () {

    debounce(function() {
      this.conversationFeed.trigger('is_typing', Slick.Models.currentUser.get('id'));
    }.bind(this), 500);

    function debounce(func, interval) {
      var lastCall = -1;
      return function() {
        clearTimeout(lastCall);
        var args = arguments;
        var self = this;
        lastCall = setTimeout(function() {
          func.apply(self, args);
        }, interval);
      };
    }
  }

});
