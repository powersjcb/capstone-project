Slick.Views.Message = Backbone.View.extend({

  template: JST['messages/show'],
  tagName: "div",
  className: "message-item",

  render: function() {
    var content = this.template({ message: this.model });
    this.$el.html(content);
    return this;
  },
});
