Slick.Views.MessagesIndex = Backbone.CompositeView.extend({

  template: JST['messages/index'],
  tagName: "div",
  className: "messages-index",

  initialize: function (options) {
    this._pageNumber = 1;
    this.conversation = options.conversation;

    this.listenTo(this.collection, 'push', this.addMessageView);

    this.listenTo(this.collection, 'add', this.prependMessageView);
    this.listenTo(this.collection, 'remove', this.removeMessageView);

    // add messages to page if going to groups index
    if (this.collection.length > 0) {
      this.collection.each(function (model) {
        this.prependMessageView(model);
      }.bind(this));
    }
  },


  addMessageView: function(model) {
    var subView = new Slick.Views.Message({
      model: model,
      user: this.conversation.subscribers().get(model.get('sender_id'))
    });
    this.addSubview('#messages-container', subView);

  },

  prependMessageView: function (model) {
    var subView = new Slick.Views.Message({
      model: model,
      user: this.conversation.subscribers().get(model.get('sender_id'))
    });
    this.addSubview('#messages-container', subView, {prepend: true});
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
    setTimeout(function () {
      this.enableScrollListener();
    }.bind(this),250);
  },

  startOnBottom: function () {
    this.$el.scrollTop(100000000);
  },

  stickScrollBottom: function() {
    var $msgDiv = this.$el;
    var stickyTolerance = 20; //px
    if ($msgDiv[0]) {
      var scrollTop = $msgDiv[0].scrollTop;
      var scrollHeight = $msgDiv[0].scrollHeight;
      var clientHeight = $msgDiv[0].clientHeight;

      var distanceToBottom = scrollHeight - clientHeight - scrollTop;
      return  distanceToBottom < stickyTolerance;
    }
    return false;
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
    $.ajax({
      url: '/api/conversations/'+ this.conversation.id +
        '/page/' + (this._pageNumber + 1),

      type: 'GET',
      success: function (data) {
        this._pageNumber = this._pageNumber + 1;
        data.forEach(function (message_json) {
          var newMessage = new Slick.Models.Message(message_json);

          this.collection.add(newMessage);
          // setTimeout(function() {
            this.offsetPage(newMessage);
          // }.bind(this), 0);

        }.bind(this));
        this.enableScrollListener();
      }.bind(this)
    });
  }, 2000, this),




  offsetPage: function (message, options) {
    var height = this.$("#message-" + message.get('id')).height();
    var currentScroll = this.$el.scrollTop();
    if (options && (options.up === true)) {
      height = -height;
    }
    this.$el.scrollTop(currentScroll + height);
  },
});
