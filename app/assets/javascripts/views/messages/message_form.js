Slick.Views.MessageForm = Backbone.CompositeView.extend({

  template: JST['messages/form'],
  tagName: "div",
  className: "input-area",

  events: {
    "submit": "submitMessage"
  },

  render: function() {
    var content = this.template({ message: this.model });
    this.$el.html(content);
    return this;
  },

  submitMessage: function (event) {
    event.preventDefault();
    $input = $('#chat-input');
    var content = $input.val();

    if (this.isValidMessage(content)) {
      this.sendMessage(content);
      $input.val("");
    } else {
      // invalid msg prompt?
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
    return true;
  }

});
