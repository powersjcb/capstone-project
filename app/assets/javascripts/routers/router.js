Slick.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.messages = options.messages;
  },

  routes: {
    "": "messages"
  },

  messages: function() {
    this.messages.fetch();
    var messagesView = new Slick.Views.MessagesIndex({
      collection: this.messages
    });

    this._swapView(messagesView);
  },

  _swapView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }



});
