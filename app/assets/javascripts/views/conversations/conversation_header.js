Slick.Views.ConversationsHeader = Backbone.CompositeView.extend({

  template: JST['conversations/header'],
  tagName: "div",
  className: "conv-header",

  initialize: function (options) {
    this.conversationFeed = options.conversationFeed;

    this.listenTo(this.model, 'change', this.render);
    this.listenToMembers();
  },

  listenToMembers: function () {
    this.conversationFeed.bind('pusher:subscription_succeeded',
      this.render.bind(this));
    this.conversationFeed.bind('pusher:member_added', this.render.bind(this));
    this.conversationFeed.bind('pusher:member_removed', this.render.bind(this));
  },

  render: function () {
    var content = this.template({
      conversation: this.model,
      conversationFeed: this.conversationFeed
    });
    this.$el.html(content);
    return this;
  },

});
