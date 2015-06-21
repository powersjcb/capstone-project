Slick.Views.MessagesIndex = Backbone.CompositeView.extend({

  template: JST['messages/index'],
  tagName: "div",
  className: "messages-index",

  initialize: function (options) {
    this._pageNumber = 1;
    this.conversation = options.conversation;

    this.listenTo(this.collection, 'push',   this.addMessageView);

    this.listenTo(this.collection, 'add',    this.prependMessageView);
    this.listenTo(this.collection, 'remove', this.removeMessageView);

    this.listenTo(this.collection, 'add',    this.debouncedGTB);

    // add messages to page if going to groups index
    if (this.collection.length > 0) {
      this.collection.each(function (model) {
        this.prependMessageView(model);
      }.bind(this));
    }


    // setTimeout(debounceImageAdd, 0);

    // detect add events, debounce
    // at end:
    // F. function called by listener
    // 0. listen to add events
    // 1. this.goToBottom()
    // 2. remove add event listener
    //
  },


  addMessageView: function(model) {
    var subView = new Slick.Views.Message({
      model: model,
      user: this.conversation.subscribers().get(model.get('sender_id'))
    });
    var stickSroll = this.stickScrollBottom();
    this.addSubview('#messages-container', subView);

    if (stickSroll) {
      this.$el.imagesLoaded( function () {
        this.goToBottom();
      }.bind(this));
    }
  },

debouncedGTB: function a () {
  // each add event move to bottom of page
  this.$el.imagesLoaded( function () {
    this.goToBottom();
  }.bind(this));

  var timeout;
  var context = this;
  var wait = 50; // debounce timer

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
    }.bind(this),1000);
  },

  goToBottom: function () {
    $('.messages-index').scrollTop(100000000);
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

          // ** has some trouble due to image loads, needs to wait for imagesLoaded
          //      to execute
          this.$el.imagesLoaded(function () {
            // causes a little bit of glitchy scrolling due to delayed execution
            // may be good to think about explicitly getting img ht from db
            // and setting custom div heights for each item to match.
            this.offsetPage(newMessage);
          }.bind(this));
        }.bind(this));
        this.enableScrollListener();
      }.bind(this)
    });
  }, 500, this),




  offsetPage: function (message, options) {
    var height = this.$("#message-" + message.get('id')).height();
    var currentScroll = this.$el.scrollTop();
    if (options && (options.up === true)) {
      height = -height;
    }
    this.$el.scrollTop(currentScroll + height);
  },
});
