Slick.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "":"groupIndex",
    "conversations/:id":"conversation",
    "groups/:id":"group",
    "groups/:group_id/conversations/:id":"groupConversation",
    "messages": "messages"
  },

  group: function (id) {
    var group = new Slick.Models.Group({id: id});

    // bad bad bad fix
    setInterval(function() {
      group.fetch();
    }.bind(this), 2000);

    var groupView = new Slick.Views.GroupShow({ model: group });
    this._swapView(groupView);
  },

  groupConversation: function (group_id, id) {
  },

  conversation: function(id) {
    var conversation = new Slick.Models.Conversation({id: id});

    // bad bad bad
    setInterval(function() {
      conversation.fetch();
    }.bind(this), 1000);

    chatView = new Slick.Views.ConversationShow({
      model: conversation
    });
    this._swapView(chatView);
  },



  messages: function() {
    this.messages = new Slick.Collections.Messages();
    this.messages.fetch();

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
