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
      user: this.user,
      timestamp: this.timestamp()
    });
    this.$el.html(content);

    if (this.model.isNew()) {
      this.$el.find('.message-body').addClass('pending');
    }
    return this;
  },

  timestamp: function () {
    var time = moment(this.model.get('created_at'));
    var now = moment();
    var yesterday = now.clone().subtract(1, 'day');

    if (time.isSame(now, 'day')) {
      return time.format('h:mm a');
    } else if (time.clone().format('MM DD YYYY') == yesterday.format('MM DD YYYY')) {
      return "yesterday at " + time.format('h:mm a');
    } else {
      return time.format('MMM DD YYYY, h:mm a');
    }
  }
});
