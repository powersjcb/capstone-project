Slick.Views.MembersIndex = Backbone.CompositeView.extend({

  template: JST['users/members_index'],
  className: "nav-left",

  initialize: function (options) {
    this.group = options.group;
    this.listenTo(this.collection, "add remove", this.drawCount);
    this.listenTo(this.collection, "add", this.addMemberItemView);
    this.listenTo(this.collection, "remove", this.removeMemberItemView);
  },

  addMemberItemView: function (model) {
    var subView = new Slick.Views.MembersIndexItem({
      model: model,
      group: this.group
    });

    this.addSubview('#members-index', subView);
  },

  removeMemberItemView: function (model) {
    this.removeModelSubview('#members-index', model);
  },

  drawCount: function () {
    this.$('#members-count').text(this.collection.length);
  },

  render: function () {
    var content = this.template({
      members: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
