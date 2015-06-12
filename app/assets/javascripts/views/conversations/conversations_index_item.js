Slick.Views.ConversationsIndexItem = Backbone.CompositeView.extend({

  template: JST['conversations/index_item'],
  tagName: "div",
  className: "left-nav-item",

  events: {
    "click": "navigateToChannel",
  },

  initialize: function (options) {
    this.group = options.group;
  },

  navigateToChannel: function () {
    Backbone.history.navigate("groups/" + this.group.get('id') + "/conversation/" +
      this.model.get('id'), { trigger: true });
  },

  render: function () {
    var content = this.template({
      conversation: this.model
    });
    this.$el.html(content);
    return this;
  }

});
