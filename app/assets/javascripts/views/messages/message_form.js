Slick.Views.MessageForm = Backbone.CompositeView.extend({

  template: JST['messages/form'],
  tagName: "div",
  className: "input-area",

  events: {
    "keydown textarea": "submitMessage"
  },

  render: function() {
    var content = this.template({ message: this.model });
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
        console.log('message cant be blank');
      }
    }
  },


  // may have to be modular for switch from ajax
  sendMessage: function(content) {
    this.model.set("content", content );
    console.log(this.model);
    this.model.save({}, {
      // success: this.removePendingStyle,
      // error: this.styleFailed
    });
    this.pendMessage();

  },

  removePendingStyle: function () {
  },

  pendMessage: function () {
    this.model.conversation.messages().add(this.model);
  },

  // styleFailed: function () {
  // },

  isValidMessage: function (user_input) {
    return user_input.length > 0 && user_input.length < 30000;
  }

});
