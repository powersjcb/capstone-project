Slick.Views.ConversationsHeader = Backbone.CompositeView.extend({

  template: JST['conversations/header'],
  tagName: "div",
  className: "conv-header",

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    var content = this.template({ conversation: this.model });
    this.$el.html(content);
    return this;
  }


});
