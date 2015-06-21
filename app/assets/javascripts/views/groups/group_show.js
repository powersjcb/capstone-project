Slick.Views.GroupShow = Backbone.CompositeView.extend({

  template: JST['groups/show'],
  tagName: "div",
  className: "group-main",

  events: {
    'click #group-index': "redirectGroups",
    'click #logout': 'logout',
    'click #group-header': "addMenuView"
  },

  initialize: function (options) {
    this.conversation = options.conversation;
    this.conversationFeed = options.conversationFeed;

    this.addConversationView();
    this.addChannelsIndex();
    this.addHeaderView();
    this.addMembersView();
    this.$('#menu').show();

    this.listenTo(this.model, "change", this.render);
  },

  addConversationView: function () {
    var subView = new Slick.Views.ConversationShow({
      model: this.conversation,
      conversationFeed: this.conversationFeed
    });
    this.addSubview('#channel', subView);
  },

  addChannelsIndex: function () {
    var subView = new Slick.Views.ConversationsIndex({
      conversation: this.conversation,
      collection: this.model.conversations(),
      group: this.model
    });
    this.addSubview('#nav-channels', subView);
  },

  addHeaderView: function () {
    var subView = new Slick.Views.GroupHeader({
      model: this.model,
    });
    this.addSubview('#group-header', subView);
  },

  addMembersView: function () {
    var subView = new Slick.Views.MembersIndex({
      collection: this.model.members(),
      group: this.model
    });
    this.addSubview('#nav-members', subView);
  },

  addMenuView: function () {
    var subView = new Slick.Views.Menu({
      conversation: this.conversation
    });
    this.$('#menu').html(subView.render().$el);
  },

  logout: function () {
    $.ajax({
      type: "DELETE",
      url: "/sessions",
      success: function() {
        window.location = "/";
      }
    });

  },

  redirectGroups: function () {
    Backbone.history.navigate('#', { trigger: true });
  },

  render: function () {
    var content = this.template({
      group : this.model,
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },


});
