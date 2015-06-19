Slick.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;

    Slick.Models.currentUser = new Slick.Models.User({
      id: window.CURRENT_USER.id,
      username: window.CURRENT_USER.username
    });


    // roll my own history listner
    this.listenTo(this, 'route', function (name, args) {
      window.appHistory.push({
        name: name,
        args: args,
        fragtment: Backbone.history.fragment
      });
      console.log(window.appHistory);
    }.bind(this));
  },

  routes: {
    "":"groupsIndex",
    "conversations/:id":"conversation",
    "groups/:group_id/conversations/:id":"groupConversation",
  },

  groupsIndex: function () {
    // shims for rendering channel view after refresh
    this.conversationFeed = this.conversationFeed || this._pusherSubscribeConv('presence-conversation');
    this.group = this.group || new Slick.Models.Group();
    this.conversation = this.conversation || new Slick.Models.Conversation();

    this.groups = new Slick.Collections.Groups();
    var groupsIndexView = new Slick.Views.GroupsFullIndex({
      collection: this.groups,
      conversation: this.conversation,
      group: this.group,
      conversationFeed: this.conversationFeed
    });

    this.groups.fetch({
      success: this._swapView(groupsIndexView)
    });
  },

  groupConversation: function (group_id, id) {
    this._group_id = this._group_id || group_id;
    this._conv_id = this._conv_id || id;

    this.group = new Slick.Models.Group({ id: group_id });
    this.conversation = new Slick.Models.Conversation({ id: id});

    this.groupFeed = this._pusherSubscribeGroup(group_id);
    this.conversationFeed = this._pusherSubscribeConv(id);

    this.groupFeed.bind('new_conversation', function(data) {
      var newConv = new Slick.Models.Conversation(data);
      this.group.conversations().add(newConv);
    }.bind(this));

    this.groupFeed.bind('new_member', function(data) {
      var newMember = new Slick.Models.User(data);
      this.group.members().add(newMember);
    }.bind(this));

    this.conversationFeed.bind('new_subscriber', function(data) {
      var newSubscriber = new Slick.Models.User(data);
      this.conversation.subscribers().add(newSubscriber);
    }.bind(this));

    this.conversationFeed.bind('new_message', function(data) {
      // console.log(data.socket_id);
      if (data.socket_id != window.pusher.connection.socket_id) {
        console.log(window.pusher.connection.socket_id);
        var newMessage = new Slick.Models.Message(data);
        this.conversation.messages().add(newMessage);
      }
    }.bind(this));

    var groupView = new Slick.Views.GroupShow({
      model: this.group,
      conversation: this.conversation,
      conversationFeed: this.conversationFeed
    });

    var appHistory = window.appHistory;
    var lastRoute = appHistory[appHistory.length - 1];
    $(window).off('transitionend', createDeferred)
    ;

    if (lastRoute && lastRoute.name == 'groupsIndex') {
      $(window).on('transitionend', createDeferred);
    }

    function createDeferred (e) {
      var deferred = $.Deferred();
      return deferred.promise();
    }

    $.when(
      this.group.fetch(),
      this.conversation.fetch(),
      $(window).triggerHandler('transitionend')
    ).done( function () {
      this._swapView(groupView);
    }.bind(this));
  },

  _swapView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  },

  _pusherSubscribeConv: function (conv_id) {
    var _cv = this._currentView;
    if (this.conversationFeed && _cv && _cv.conversation &&
      _cv.conversation.id) {
      window.pusher.unsubscribe(
        'presence-conversation-' + this._currentView.conversation.id
      );
    }
    return window.pusher.subscribe('presence-conversation-' + conv_id);
  },

  _pusherSubscribeGroup: function (group_id) {
    var _cv = this._currentView;
    if (this.groupFeed && _cv && _cv.model && _cv.model.id) {
      window.pusher.unsubscribe(
        'presence-group-' + this._currentView.model.get('id')
      );
    }
    return window.pusher.subscribe('presence-group-' + group_id);
  }



});
