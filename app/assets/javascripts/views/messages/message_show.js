Slick.Views.Message = Backbone.View.extend({

  template: JST['messages/show'],
  tagName: "div",
  className: "message-item",

  initialize: function (options) {
    this.user = options.user;
  },

  render: function() {
    var content = this.template({
      message: this.model,
      user: this.user
    });
    this.$el.html(content);
    return this;
  },
});
