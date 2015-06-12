Slick.Views.GroupHeader = Backbone.CompositeView.extend({

  template: JST['groups/header'],
  tagName: "div",
  className: "group-header",

  events: {
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    var content = this.template({
      group: this.model,
      currentUser: Slick.Models.currentUser
    });
    this.$el.html(content);
    return this;
  }

});
