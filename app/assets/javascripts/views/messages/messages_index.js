Slick.Views.MessagesIndex = Backbone.View.extend({

  template: JST['messages/index'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }

});
