Slick.Views.GroupShow = Backbone.CompositeView.extend({

  template: JST['groups/show'],
  tagName: "div",

  events: {

  },

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
    this.addConversationView();
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

  },

  render: function () {
    var content = this.template({ group : this.model });
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },


});
