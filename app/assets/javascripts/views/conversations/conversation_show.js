Slick.Views.ConversationShow = Backbone.CompositeView.extend({

  template: JST['conversations/show'],
  tagName: "div",
  className: "conversation-show",

  initialize: function (options) {
    this.conversationFeed = options.conversationFeed;
    this.addMessagesIndex();
    this.addHeaderView();
    this.addMessageFormView();
  },

  addMessageFormView: function() {
    var subView = new Slick.Views.MessageForm({
      conversation: this.model,
      collection: this.collection,
      users: this.model.users(),
      conversationFeed: this.conversationFeed
    });
    this.addSubview('#composer', subView);
  },

  addMessagesIndex:  function() {
    var subView = new Slick.Views.MessagesIndex({
      collection: this.model.messages(),
      conversation: this.model
    });
    this.addSubview('#conversation', subView);
  },

  addHeaderView: function () {
    var subView = new Slick.Views.ConversationsHeader({
      model: this.model
    });
    this.addSubview('#conversation-header', subView);
  },

  render: function () {
    var content = this.template({ conversation: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

});
