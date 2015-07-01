Slick.Views.GroupsFullIndex = Backbone.CompositeView.extend({

  template: JST['groups/full_index'],
  tagName: "div",
  className: "group-full-index group-index",

  events: {
    "click button.create": "addGroupForm"
  },


  initialize: function (options) {
    this.group = options.group;
    this.conversation = options.conversation;
    this.conversationFeed = options.conversationFeed;



    this.addGroupShowView();
    this.listenToOnce(this.collection, 'sync', this.triggerSurogates);
    this.listenTo(this.collection, 'add', this.addGroupView);
    this.listenTo(this.collection, 'remove', this.removeGroupView);
  },

  addGroupShowView: function () {
    var subView = new Slick.Views.GroupShow({
      conversationFeed: this.conversationFeed,
      conversation: this.conversation,
      model: this.group
    });
    this.addSubview('#mock-group', subView);
  },

  addGroupForm: function () {
    var newGroup = new Slick.Models.Group();
    var subView = new Slick.Views.GroupForm({
      model: newGroup,
      collection: this.collection
    });
    // this.addSubview('#modal-holder', subView)
    $('body').prepend(subView.render().$el);
  },

  triggerSurogates: function () {
    // this.group.trigger('sync');
    // this.conversation.trigger('sync');
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
    this.onRender();
    return this;
  },

  onRender: function () {
    setTimeout( function() {
      $('.groups-nav').removeClass('collapsed');
    }, 50);
  }


});
