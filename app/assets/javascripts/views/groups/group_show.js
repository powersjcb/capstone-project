Slick.Views.GroupShow = Backbone.CompositeView.extend({

  template: JST['groups/show'],
  tagName: "div",
  className: "group-main",

  events: {
    'click #group-index': "redirectGroups"
  },

  initialize: function (options) {
    this.conversation = options.conversation;
    this.conversationFeed = options.conversationFeed;

    this.addConversationView();
    this.addChannelsIndex();
    this.addHeaderView();
    this.addMembersView();

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
