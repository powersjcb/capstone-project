Slick.Views.ConversationShow = Backbone.CompositeView.extend({

  template: JST['conversations/show'],
  tagName: "div",
  className: "conversation-show",

  initialize: function () {
    this.addMessagesIndex();
    this.addHeaderView();
    this.listenTo(this.model, 'change', this.addMessageFormView);
  },

  addMessageFormView: function() {
    console.log('new form');
    var newMessage = new Slick.Models.Message({},{conversation: this.model});
    var subView = new Slick.Views.MessageForm({
      model: newMessage,
      collection: this.collection,
      users: this.model.users()
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
