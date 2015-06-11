Slick.Views.ConversationsIndex = Backbone.CompositeView.extend({

  template: JST['conversations/index'],
  tagName: "div",
  className: "channels-index",

  initialize: function (options) {
    this.group = options.group;

    this.listenTo(this.collection, 'add', this.addConvItemView);
    this.listenTo(this.collection, 'remove', this.removeConvItemView);
  },

  addConvItemView: function (model) {
    var subView = new Slick.Views.ConversationsIndexItem({
      model: model,
      group: this.group
    });
    this.addSubview('#channels-list', subView);
  },

  removeConvItemView: function (model) {
    this.removeModelSubview('#channels-list', model);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },


});
