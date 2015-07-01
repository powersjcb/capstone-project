Slick.Views.MessageForm = Backbone.CompositeView.extend({

  template: JST['messages/form'],
  tagName: "div",
  className: "input-area",

  events: {
    "keydown textarea": "handleKeydown",
    "click .file-upload": "uploadPrompt"
  },

  initialize: function(options) {
    this.conversationFeed = options.conversationFeed;
    this.users = options.users;
    this.conversation = options.conversation;
    this.model = new Slick.Models.Message({},{
      conversation: this.conversation
    });

    this._thumb_url = "";
    this._url = "";

    this.addTypingView();
  },

  addTypingView: function () {
    var subView = new Slick.Views.IsTyping({
      conversationFeed: this.conversationFeed,
      users: this.users
    });
    this.addSubview('#is-typing', subView);
  },

  addImagePreview: function() {
    var subView = new Slick.Views.ImagePreview({
      model: this.model
    });
    this.addSubview('#image-preview', subView);
  },

  removeImagePreview: function () {
    this.removeModelSubview('#image-preview', this.model);
  },

  render: function() {
    var content = this.template({
      message: this.model,
      url: this._thumb_url
    });
    this.$el.html(content);
    setTimeout( function () {
      this.$('#chat-input').focus();
    }.bind(this), 500);
    return this;
  },

  handleKeydown: function (event) {
    var $input = $('#chat-input');
    setTimeout(function () {
      if ($input.val() === "") {
        this.finishTyping();
      } else {
        this.isTyping();
      }
    }.bind(this), 50);

    // ignores shift+return
    if (!event.shiftKey && event.keyCode == 13) {
      event.preventDefault();
      var content = $input.val();
      $input.val("");

      if (this.isValidMessage(content)) {
        this.sendMessage(content);
      } else {
        // invalid msg
        console.log('invalid msg');
      }
    }
  },

  sendMessage: function(content) {
    var socketId = window.pusher.connection.socket_id;
    this.removeImagePreview();
    this.model = new Slick.Models.Message({
      content: content
    }, {
      conversation: this.conversation
    });
    this.model.set('url', this._url);
    this.model.set("sender_id", Slick.Models.currentUser.get('id'));
    this.model.set("socket_id", socketId);
    this.model.save({},{});
    this._url = "";
    this._thumb_url = "";
    this.pendMessage();
    this.model = new Slick.Models.Message({},{
      conversation: this.conversation
    });
  },

  pendMessage: function () {
    this.users.add(Slick.Models.currentUser);
    this.conversation.messages().add(this.model, {silent: true});
    this.conversation.messages().trigger('push', this.model);
  },


  isValidMessage: function (user_input) {
    return user_input.length > 0 && user_input.length < 30000;
  },


  // pusher events
  isTyping: _.debounce( function () {
    this.conversationFeed.trigger('client-is_typing', {user_id: Slick.Models.currentUser.get('id')});
  }, 500, true),

  finishTyping: function () {
    this.conversationFeed.trigger('client-finish_typing', {user_id: Slick.Models.currentUser.get('id')});
  },

  uploadPrompt: function () {
    var cloud_base = "http://res.cloudinary.com/slickapp-io/image/upload";
    var settings = "/w_40,h_40,c_fit/"; // fits within 40px, scale prop.
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result){
      if (result) {
        var data = result[0];
        this._url = data.url;
        this._thumb_url = cloud_base + settings + data.path;
        this.model.set('url', this._thumb_url);
        this.addImagePreview();
      }
    }.bind(this));
  }



});
