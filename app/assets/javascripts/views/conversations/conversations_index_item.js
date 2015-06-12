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
    var navPath = "groups/" + this.group.get('id') + "/conversations/" +
      this.model.get('id');
      console.log(navPath);

    Backbone.history.navigate(navPath, { trigger: true });
  },

  render: function () {
    var content = this.template({
      conversation: this.model,
    });
    this.$el.html(content);
    return this;
  },



});
