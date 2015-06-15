Slick.Views.MessageForm = Backbone.CompositeView.extend({

  template: JST['messages/form'],
  tagName: "div",
  className: "input-area",

  events: {
    "keydown textarea": "submitMessage"
  },

  initialize: function(options) {
    this.users = options.users;
    this.callbackId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 20);
  },

  render: function() {
    var content = this.template({
      message: this.model,
      callbackId: this.callbackId
    });
    this.$el.html(content);
    return this;
  },

  submitMessage: function (event) {
    // ignores shift+return
    if (!event.shiftKey && event.keyCode == 13) {
      event.preventDefault();
      $input = $('#chat-input');
      var content = $input.val();

      if (this.isValidMessage(content)) {
        this.sendMessage(content);
        $input.val("");
      } else {
        // invalid msg prompt?
      }
    }
  },


  // may have to be modular for switch from ajax
  sendMessage: function(content) {
    this.model.set("content", content );
    this.model.set("callback_id", this.callbackId);
    this.model.set('sender_id', Slick.Models.currentUser.get('id'));
    this.model.save({}, {
      // success: this.removePending.bind(this),

    });
    // this.pendMessage();
  },

  pendMessage: function () {
    this.users.add(Slick.Models.currentUser);
    this.model.conversation.messages().add(this.model);
  },

  // removePending: function (model) {
  // },


  // styleFailed: function () {
  // },

  isValidMessage: function (user_input) {
    return user_input.length > 0 && user_input.length < 30000;
  }

});
