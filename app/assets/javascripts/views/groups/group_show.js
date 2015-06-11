Slick.Views.GroupShow = Backbone.CompositeView.extend({

  template: JST['groups/show'],
  tagName: "div",
  className: "group-main",

  events: {

  },

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
    this.addConversationView();
    this.addChannelsIndex();
  },

  addConversationView: function () {
    var subView = new Slick.Views.ConversationShow({
      model: this.model.conversation()
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

  },

  render: function () {
    var content = this.template({
      group : this.model,
    });
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },


});
