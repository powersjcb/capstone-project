Slick.Views.IsTyping = Backbone.View.extend({

  template: JST['users/is_typing'],

  initialize: function (options) {
    this.conversationFeed = options.conversationFeed;
    this.typingUsers = new Slick.Collections.Users();
    this.listenTo(this.typingUsers, 'change', this.render);
  },

  render: function () {
    var content = this.template({
      typingUsers: this.typingUsers
    });
    this.$el.html(content);
    return this;
  },


});
