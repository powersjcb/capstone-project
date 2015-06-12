Slick.Views.GroupIndexItem = Backbone.View.extend({

  template: JST['groups/index_item'],
  tagName: "div",
  className: "group-item",

  events: {
    "click": "navigateToGroup"
  },

  render: function() {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    return this;
  },

  navigateToGroup: function () {
    var groupUrl = "groups/" + this.model.get('id') + "/conversations/" +
      this.model.get('first_conv_id');
    Backbone.history.navigate(groupUrl, {trigger: true});
  },
});
