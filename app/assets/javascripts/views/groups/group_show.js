Slick.Views.GroupShow = Backbone.CompositeView.extend({

  template: JST['groups/show'],
  tagName: "div",
  className: "group-main",

  events: {

  },

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
    this.addConversationView();
    this.addChannelsView();
  },

  addConversationView: function () {
    var subView = new Slick.Views.ConversationShow({
      model: this.model.conversation()
    });
    this.addSubview('#channel', subView);
  },

  addHeaderView: function () {

  },

  addChannelsView: function () {
    var subView = new Slick.Views.ConversationsIndex({
      collection: this.model.conversations()
    });
  },

  render: function () {
    var content = this.template({
      group : this.model,
      current_user: Slick.Models.current_user
    });
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },


});
