Slick.Views.ConversationsIndex = Backbone.CompositeView.extend({

  template: JST['conversations/index'],
  tagName: "div",
  className: "channels-index",

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addConvItemView);
    this.listenTo(this.collection, 'remove', this.removeConvItemView);
  },

  addConvItemView: function (model) {
    var subView = new Slick.Views.ConversationIndexItem( {model: model} );
    this.addSubview('#conv-list', subView);
  },

  removeConvItemView: function (model) {
    this.removeModelSubview('#conv-list', model);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },


});
