Slick.Views.IsTyping = Backbone.CompositeView.extend({

  template: JST['users/is_typing'],

  initialize: function (options) {
    this.users = options.users;
    this.conversationFeed = options.conversationFeed;
    this.typingUsers = new Slick.Collections.Users();

    this.conversationFeed.bind('client-is_typing', this.isTyping.bind(this));
    this.conversationFeed.bind('client-finish_typing',
      this.finishTyping.bind(this));
    this.listenTo(this.typingUsers, 'add remove', this.render);
  },

  render: function () {
    var content = this.template({
      typingUsers: this.typingUsers,
      toSentence: this.toSentence
    });
    this.$el.html(content);
    return this;
  },

  toSentence: function (arr) {
    var s;
    if (arr.length > 2) {
      s = arr.slice(0, arr.length - 1).join(', ') + ", and " + arr.slice(-1);
    } else if (arr.length == 2) {
      s = arr[0] + " and" + arr[1];
    } else {
      s = arr[0];
    }
    return s;
  },

  isTyping: function (data) {
    var user = this.users.get(data.user_id);
    if (user) {
      this.typingUsers.add(user);
    }

    this.notTypingAnymore(user);
  },

  finishTyping: _.debounce( function (data) {
    var user = this.users.get(data.user_id);
    if (user) {
      this.typingUsers.remove(user);
    }
  }, 250),


  notTypingAnymore: _.debounce( function(user) {
      this.typingUsers.remove(user);
  }, 25000),

});
