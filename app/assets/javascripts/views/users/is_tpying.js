Slick.Views.IsTyping = Backbone.View.extend({

  template: JST['users/is_typing'],

  initialize: function (options) {
    this.conversationFeed = options.conversationFeed;
    this.conversationFeed.bind('is_typing', this.isTyping);

    this.listenTo(this.typingUsers, "change", this.render);
  },

  isTyping: function (data) {

  },

  


});
