Slick.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;

    Slick.Models.currentUser = new Slick.Models.User({
      id: window.CURRENT_USER.id,
      username: window.CURRENT_USER.username,
      profile_img_url: window.CURRENT_USER.profile_img_url
    });


    // roll my own history listner
    this.listenTo(this, 'route', function (name, args) {
      window.appHistory.push({
        name: name,
        args: args,
        fragtment: Backbone.history.fragment
      });
    }.bind(this));

    this.groupsIndex = _.throttle(this.groupsIndex, 1500);
    this.groupConversation = _.throttle(this.groupConversation, 1500);
    // this.groupConversation = console.log("hi");
  },

  routes: {
    "":"groupsIndex",
    "conversations/:id":"conversation",
    "groups/:group_id/conversations/:id":"tempGroupConversation",
  },

  tempGroupConversation: function(group_id, id) {
    this.groupConversation(group_id, id);
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
        this.conversation.messages().add(newMessage, {silent: true});
        this.conversation.messages().trigger('push', newMessage);
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

    if (lastRoute && lastRoute.name === 'groupsIndex') {
      $(window).on('transitionend', createDeferred);
    }

    function createDeferred (e) {
      var deferred = $.Deferred();
      return deferred.promise();
    }


    $.when(
      this.group.fetch(),
      this.conversation.fetch()
      // $(window).triggerHandler('transitionend')
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
    if (this._convChannelName) {
      window.pusher.unsubscribe(this._convChannelName);
      // set timeout for subscribe
    }
      this._convChannelName = 'presence-conversation-' + conv_id;
      return window.pusher.subscribe(this._convChannelName);
  },

  _pusherSubscribeGroup: function (group_id) {
    if (this._groupChannelName) {
      window.pusher.unsubscribe(this._groupChannelName);
    }
    this._groupChannelName = 'presence-group-' + group_id;
    return window.pusher.subscribe(this._groupChannelName);
  }



});
