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
    this.groupFeed = window.pusher.subscribe('presence-group-' + group_id);
    this.conversationFeed = window.pusher.subscribe('presence-conversation-' + id);

    var group = new Slick.Models.Group({ id: group_id });
    var conversation = new Slick.Models.Conversation({ id: id});

    this.groupFeed.bind('new_conversation', function(data) {
      var newConv = new Slick.Models.Conversation(data);
      group.conversations().add(newConv);
    }.bind(this));

    this.groupFeed.bind('new_member', function(data) {
      var newMember = new Slick.Models.User(data);
      group.members().add(newMember);
    }.bind(this));

    this.conversationFeed.bind('new_subscriber', function(data) {
      var newSubscriber = new Slick.Models.User(data);
      conversation.subscribers().add(newSubscriber);
    }.bind(this));

    this.conversationFeed.bind('new_message', function(data) {
      console.log(data.socket_id);
      if (data.socket_id != window.pusher.connection.socket_id) {
        console.log(window.pusher.connection.socket_id);
        var newMessage = new Slick.Models.Message(data);
        conversation.messages().add(newMessage);
      }
    }.bind(this));




    group.fetch();
    conversation.fetch();


    var groupView = new Slick.Views.GroupShow({
      model: group,
      conversation: conversation,
      conversationFeed: this.conversationFeed
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
