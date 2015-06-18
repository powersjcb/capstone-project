Slick.Views.MessagesIndex = Backbone.CompositeView.extend({

  template: JST['messages/index'],
  tagName: "div",
  className: "messages-index",

  initialize: function (options) {
    this.conversation = options.conversation;

    this.listenTo(this.collection, 'add remove', this.stickScrollBottom);
    this.listenTo(this.collection, 'add', this.addMessageView);
    this.listenTo(this.collection, 'remove', this.removeMessageView);

    // add messages to page if going to groups index
    if (this.collection.length > 1) {
      this.collection.each(function (model) {
        this.addMessageView(model);
      }.bind(this));
    }

    this.startOnBottom();

  },


  addMessageView: function(model) {
    var subView = new Slick.Views.Message({
      model: model,
      user: this.conversation.subscribers().get(model.get('sender_id'))
      });
    this.addSubview('#messages-container', subView);
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
    var $msgDiv = this.$el;
    if ($msgDiv[0]) {
      var scrollHeight = $msgDiv[0].scrollHeight;
      $msgDiv.scrollTop(scrollHeight);
    }
  },

  stickScrollBottom: function() {
    var $msgDiv = this.$el;
    var stickyTolerance = 10; //px
    if ($msgDiv[0]) {
      var scrollTop = $msgDiv[0].scrollTop;
      var scrollHeight = $msgDiv[0].scrollHeight;
      var clientHeight = $msgDiv[0].clientHeight;

      var distanceToBottom = scrollHeight - clientHeight - scrollTop;

      if (distanceToBottom < stickyTolerance) {
        setTimeout(function() {
          this.startOnBottom();
        }.bind(this),0);
      }
    }
  },

    // throttle getting new messages
  loadMoreMessages: _.throttle( function() {
    $.ajax({
      url: '/api/conversations/'+ this.conversation.id + '/page/' + pageNumber,
      type: 'GET',
      success: function (response) {
        this.collection.add(response.messages);
      }
    });
  }, 1500),
});
