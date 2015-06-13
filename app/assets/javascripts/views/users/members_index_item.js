Slick.Views.MembersIndexItem = Backbone.CompositeView.extend({
  template: JST['users/members_index_item'],
  tagName: "div",
  className: "left-nav-item",

  render: function () {
    var content = this.template({member: this.model});
    this.$el.html(content);
    return this;
  }
});
