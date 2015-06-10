Slick.Views.MessagesIndex = Backbone.CompositeView.extend({

  template: JST['messages/index'],
  tagName: "div",
  className: "messages-index",

  initialize: function (options) {
    this.conversation = options.conversation;

    this.listenTo(this.collection, 'add', this.addMessageView);
    this.listenTo(this.collection, 'remove', this.removeMessageView);
    this.listenTo(this.collection, 'add remove', this.stickScrollBottom);

    // fix this somehow later, using settimeout for now
    // this.listenToOnce(this.collection, 'sync', this.startOnBottom);

    setTimeout(this.startOnBottom, 250);
  },


  addMessageView: function(model) {
    var subView = new Slick.Views.Message({ model: model });
    this.addSubview('#messages-container', subView);
  },

  onRender: function () {
    this.startOnBottom();
    Backbone.CompositeView.prototype.onRender.call(this);
  },

  removeMessageView: function(model) {
    this.removeModelSubview('#messages-container', model);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },

  startOnBottom: function () {
    var $msgDiv = $("#messages-container");
    if ($msgDiv[0]) {
      var scrollHeight = $msgDiv[0].scrollHeight;
      $msgDiv.scrollTop(scrollHeight);
    }
  },

  stickScrollBottom: function() {
    var $msgDiv = $("#messages-container");
    var stickyTolerance = 10; //px
    if ($msgDiv[0]) {
      var scrollTop = $msgDiv[0].scrollTop;
      var scrollHeight = $msgDiv[0].scrollHeight;
      var clientHeight = $msgDiv[0].clientHeight;

      var distanceToBottom = scrollHeight - clientHeight - scrollTop;

      if (distanceToBottom < stickyTolerance) {
        $msgDiv.scrollTop(scrollHeight);
      }
    }
  }

});
