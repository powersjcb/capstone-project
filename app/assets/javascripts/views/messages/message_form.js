Slick.Views.MessageForm = Backbone.View.extend({

  template: JST['messages/form'],
  tagName: "div",
  className: "input-area",

  events: {
    "submit": "sendMessage"
  },

  render: function() {
    var content = this.template({ message: this.model });
    this.$el.html(content);
    return this;
  },

  sendMessage: function(event) {
    event.preventDefault();
    console.log('tried to send message');
  }
});
