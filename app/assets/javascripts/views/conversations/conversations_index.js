Slick.Views.ConversationsIndex = Backbone.CompositeView.extend({

  template: JST['conversations/index'],
  tagName: "div",
  className: "channels-index",

  events: {
    "click #channel-create": "addChannelForm"
  },

  initialize: function (options) {
    this.group = options.group;

    this.listenTo(this.collection, 'add', this.addConvItemView);
    this.listenTo(this.collection, 'remove', this.removeConvItemView);
  },

  addChannelForm: function () {
    var newConv = new Slick.Models.Conversation({group_id: this.group.get('id')});
    var subView = new Slick.Views.ConversationForm({
      model: newConv,
      collection: this.collection
    });

    $('body').prepend(subView.render().$el);
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
