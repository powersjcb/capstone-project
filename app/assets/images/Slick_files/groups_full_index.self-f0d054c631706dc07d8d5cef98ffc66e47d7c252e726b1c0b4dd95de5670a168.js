Slick.Views.GroupsFullIndex = Backbone.CompositeView.extend({

  template: JST['groups/full_index'],
  tagName: "div",
  className: "group-full-index group-index",

  events: {
    "click button.create": "addGroupForm"
  },


  initialize: function () {
    this.listenTo(this.collection, 'add', this.addGroupView);
    this.listenTo(this.collection, 'remove', this.removeGroupView);
  },


  addGroupForm: function () {
    var newGroup = new Slick.Models.Group();
    var subView = new Slick.Views.GroupForm({
      model: newGroup,
      collection: this.collection
    });

    $('body').prepend(subView.render().$el);
  },


  addGroupView: function(model) {
    var subView = new Slick.Views.GroupIndexItem({ model: model });
    this.addSubview('#group-items', subView);
  },

  removeGroupView: function(model) {
    this.removeModelSubview('#group-items', model);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },


});
