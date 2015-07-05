Slick.Views.MessagesIndex = Backbone.CompositeView.extend({

  template: JST['messages/index'],
  tagName: "div",
  className: "messages-index",

  initialize: function (options) {
    this._pageNumber = 1;
    this.conversation = options.conversation;

    // add new messages from pusher/client creation
    this.listenTo(this.collection, 'push',   this.addMessageView);

    // infinite scroll messages
    this.listenTo(this.collection, 'add',    this.prependMessageView);
    this.listenTo(this.collection, 'remove', this.removeMessageView);

    // add messages on page load
    this.listenTo(this.collection, 'add',    this.debouncedGTB);

    // add messages to page if going to groups index
    if (this.collection.length > 0) {
      this.collection.each(function (model) {
        this.prependMessageView(model);
      }.bind(this));
    }
  },

  // add messages from pusher/client creation
  addMessageView: function(model) {
    var user = this.conversation.subscribers().get(model.get('sender_id')) ||
      new Slick.Models.User();
    var subView = new Slick.Views.Message({
      model: model,
      user: user
    });
    var stickSroll = this.stickScrollBottom();
    this.addSubview('#messages-container', subView);

    if (stickSroll) {
      this.goToBottom();
      this.offsetImage(model);
    }
  },

debouncedGTB: function a (model) {
  // each add event move to bottom of page
  setTimeout(function () {
    this.goToBottom();
  }.bind(this), 500);

  this.offsetImage(model);

  var timeout;
  var context = this;
  var wait = 30; // debounce timer

  var later = function() {
    timeout = null;
    func.call(context);
  };

  var callNow = !timeout;
  clearTimeout(timeout);
  timeout = setTimeout(later, wait);

  if (callNow) {
    func.apply(context);
  }

  // at the end stop listening
  function func () {
    this.stopListening(this.collection, 'add', a);
  }
},

  prependMessageView: function (model) {
    var subView = new Slick.Views.Message({
      model: model,
      user: this.conversation.subscribers().get(model.get('sender_id'))
    });
    this.addSubview('#messages-container', subView, {prepend: true});
    var messageSelector = "#message-" + model.get('id');
    this.offsetPage(messageSelector);
    this.offsetImage(model);
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
    }.bind(this), 1000);
    Backbone.CompositeView.prototype.onRender.call(this);
  },

  goToBottom: function () {
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
        }.bind(this));

      this.enableScrollListener();
      }.bind(this)
    });
  }, 500, this),


  offsetImage: function (message, options) {
    var selector = "#message-" + message.get('id') + ' .message-img';
      var url = message.get('url') !== "";
      var $imageDiv = this.$(selector);
      var imageCached = $imageDiv.find('img').height() > 0;
      if (url && !imageCached) {
        $imageDiv.imagesLoaded()
          .done( function (instance) {
            debugger;
            this.offsetPage(selector, options);
          }.bind(this));
      }
  },

  offsetPage: function (selector, options) {
    var height = this.$(selector).height();
    var currentScroll = this.$el.scrollTop();
    if (options && (options.up === true)) {
      height = -height;
    }
    this.$el.scrollTop(currentScroll + height);
    return height;
  },

});
