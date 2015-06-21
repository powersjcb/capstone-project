Slick.Views.ConversationsIndexItem = Backbone.CompositeView.extend({

  template: JST['conversations/index_item'],
  tagName: "div",
  className: "left-nav-item",

  events: {
    "click": "navigateToChannel",
  },

  initialize: function (options) {
    this.group = options.group;
    this.active_conversation = options.active_conversation;

    this.listenTo(this.active_conversation, "change", this.updateClass);
  },

  navigateToChannel: function () {
    var navPath = "groups/" + this.group.get('id') + "/conversations/" +
      this.model.get('id');

    Backbone.history.navigate(navPath, { trigger: true });
  },

  render: function () {
    var content = this.template({
      conversation: this.model,
    });
    this.$el.html(content);
    return this;
  },

  updateClass: function () {
    this.$el.removeClass('active-conv');
    if (this.active_conversation.id == this.model.id) {
      this.$el.addClass('active-conv');
    }
  }

});
