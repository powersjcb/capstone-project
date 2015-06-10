Slick.Views.MessagesIndex = Backbone.CompositeView.extend({

  template: JST['messages/index'],
  tagName: "div",

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addMessageView);
    this.listenTo(this.collection, 'remove', this.removeMessageView);
    this.listenTo(this.collection, 'add remove', this.stickScrollBottom);
    this.listenTo(this.collection, 'sync', this.startOnBottom);

    this.addMessageFormView();
  },

  addMessageFormView: function() {
    var newMessage = new Slick.Models.Message();
    var subView = new Slick.Views.MessageForm({ model: newMessage });
  },

  addMessageView: function(model) {
    var subView = new Slick.Views.Message({ model: model });
    this.addSubview('#messages-container', subView);
  },

  removeMessageView: function(model) {
    this.removeMovelSubView('#messages-container', model);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  startOnBottom: function () {
    var $msgDiv = $("#messages-container");
    var scrollHeight = $msgDiv[0].scrollHeight;
    $msgDiv.scrollTop(scrollHeight);
  },

  stickScrollBottom: function() {
    var $msgDiv = $("#messages-container");
    var stickyTolerance = 10; //px

    var scrollTop = $msgDiv[0].scrollTop;
    var scrollHeight = $msgDiv[0].scrollHeight;
    var clientHeight = $msgDiv[0].clientHeight;

    var distanceToBottom = scrollHeight - clientHeight - scrollTop;

    if (distanceToBottom < stickyTolerance) {
      $msgDiv.scrollTop(scrollHeight);
    }
  }

});
