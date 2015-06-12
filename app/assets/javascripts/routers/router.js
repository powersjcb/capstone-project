Slick.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;

    Slick.Models.currentUser = new Slick.Models.User({
      id: window.CURRENT_USER.id,
      username: window.CURRENT_USER.username
    });
  },

  routes: {
    "":"groupsIndex",
    "conversations/:id":"conversation",
    "groups/:id":"group",
    "groups/:group_id/conversations/:id":"groupConversation",
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

  groupsIndex: function () {
    this.groupConversation(1,1);
  },

  groupConversation: function (group_id, id) {
    var group = new Slick.Models.Group({
      id: group_id,
      conversation_id: id
    });


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



  _swapView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }



});
