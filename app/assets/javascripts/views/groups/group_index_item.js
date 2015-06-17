Slick.Views.GroupIndexItem = Backbone.View.extend({

  template: JST['groups/index_item'],
  tagName: "div",
  className: "group-item",

  events: {
    "click": "joinGroup"
  },

  render: function() {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    return this;
  },

  joinGroup: function () {
    var membership = new Slick.Models.Membership({group_id: this.model.get('id')});
    membership.save({}, {
      success: this.redirectToGroup.bind(this),
    });
  },

  redirectToGroup: function () {
    $('.groups-nav').addClass('collapsed');
    var groupUrl = "groups/" + this.model.get('id') + "/conversations/" +
      this.model.get('first_conv_id');
    Backbone.history.navigate(groupUrl, {trigger: true});
  },
});
