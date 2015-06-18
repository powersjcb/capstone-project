Slick.Views.MessagesIndex = Backbone.CompositeView.extend({

  template: JST['messages/index'],
  tagName: "div",
  className: "messages-index",

  initialize: function (options) {
    this._pageNumber = 1;
    this.conversation = options.conversation;

    this.listenTo(this.collection, 'add remove', this.stickScrollBottom);
    this.listenTo(this.collection, 'add', this.addMessageView);
    this.listenTo(this.collection, 'remove', this.removeMessageView);

    // add messages to page if going to groups index
    if (this.collection.length > 0) {
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
    this.smartAddSubview('#messages-container', subView, "messages");
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

  onRender: function () {
    setTimeout( function () {
      this.enableScrollListener();
    }.bind(this), 500);
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

  handleScrolling: function () {
    if (this.isNearScrollTop() && this._pageNumber <= this.conversation.get('total_pages')) {
      this.loadOlderMessages();
    }
  },

  enableScrollListener: function () {
    this.$el.on('scroll', this.handleScrolling.bind(this));
  },

  disableScrollListener: function () {
    this.$el.off('scroll', this.handleScrolling.bind(this));
  },

  isNearScrollTop: function () {
    var $msgDiv = this.$el;
    var tolerance = 100; //px
    if ($msgDiv[0]) {
      var scrollTop = $msgDiv[0].scrollTop;
      if (scrollTop < tolerance) {
        return true;
      }
    }
    return false;
  },

    // throttle getting new messages
  loadOlderMessages: _.throttle( function() {
    this.disableScrollListener();
    console.log('near top');

    $.ajax({
      url: '/api/conversations/'+ this.conversation.id +
        '/page/' + (this._pageNumber + 1),

      type: 'GET',
      success: function (data) {
        data.forEach(function (message_json) {
          this._pageNumber ++;
          var newMessage = new Slick.Models.Message(message_json);
          this.collection.set(newMessage, {remove: false});
        }.bind(this));
        this.enableScrollListener();
      }.bind(this)
    });
  }, 1500, this),
});
