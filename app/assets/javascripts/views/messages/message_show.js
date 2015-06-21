Slick.Views.Message = Backbone.View.extend({

  template: JST['messages/show'],
  tagName: "div",
  className: "message-item clearfix",
  attributes: function () {
    return {"data-id": this.model.get('id'), id: "message-" + this.model.get('id')};
  },

  initialize: function (options) {
    this.user = options.user;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.user, 'sync', this.render);
  },

  render: function() {
    var content = this.template({
      message: this.model,
      user: this.user
    });
    this.$el.html(content);

    if (this.model.isNew()) {
      this.$el.find('.message-body').addClass('pending');
    }
    return this;
  },
});
