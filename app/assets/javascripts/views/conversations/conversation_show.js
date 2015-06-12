Slick.Views.ConversationShow = Backbone.CompositeView.extend({

  template: JST['conversations/show'],
  tagName: "div",

  initialize: function () {
    this.addMessagesIndex();
    this.listenTo(this.model, 'change', this.addMessageFormView);
  },


  addMessageFormView: function() {
    var newMessage = new Slick.Models.Message({},{conversation: this.model});
    var subView = new Slick.Views.MessageForm({
      model: newMessage,
      collection: this.collection
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


  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },


});
