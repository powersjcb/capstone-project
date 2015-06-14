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

    group.fetch();

    var groupView = new Slick.Views.GroupShow({ model: group });
    this._swapView(groupView);
  },

  groupsIndex: function () {
    var groups = new Slick.Collections.Groups();

    groups.fetch();

    var groupsIndexView = new Slick.Views.GroupsFullIndex({
      collection: groups
    });

    this._swapView(groupsIndexView);
  },

  groupConversation: function (group_id, id) {
    var group = new Slick.Models.Group({ id: group_id });
    var conversation = new Slick.Models.Conversation({ id: id});

    setInterval(function() {
      group.fetch();
      conversation.fetch();

    }.bind(this), 2000);

    var groupView = new Slick.Views.GroupShow({
      model: group,
      conversation: conversation
    });
    this._swapView(groupView);
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
