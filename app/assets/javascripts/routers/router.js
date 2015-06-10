Slick.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "conversations/:id":"conversation",
    "messages": "messages"
  },

  conversation: function(id) {
    var conversation = new Slick.Models.Conversation({id: id});

    setInterval(function() {
      conversation.fetch();
    }.bind(this), 2000);

    chatView = new Slick.Views.ConversationShow({
      model: conversation
    });
    this._swapView(chatView);
  },



  messages: function() {
    this.messages = new Slick.Collections.Messages();
    this.messages.fetch();

      //bad annoying, dont do

    var messagesView = new Slick.Views.MessagesIndex({
      collection: this.messages
    });

    this._swapView(messagesView);
  },

  _swapView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }



});
