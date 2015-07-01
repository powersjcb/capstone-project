Slick.Models.Conversation = Backbone.Model.extend({
  urlRoot: "/api/conversations",

  initialize: function (options) {
    if (options && options.total_pages) {
      this.total_pages = options.total_pages;
    }
  },

  messages: function() {
    if (this._messages) {
      return this._messages;
    }
    this._messages = new Slick.Collections.Messages([],{conversation: this});
    return this._messages;
  },

  subscribers: function () {
    if (this._subscribers) {
      return this._subscribers;
    }
    this._subscribers = new Slick.Collections.Users();
    return this._subscribers;
  },

  parse: function (payload) {

    // must parse subscribers first
    if (payload.subscribers) {
      this.subscribers().set(payload.subscribers, { parse: true });
      delete payload.subscribers;
    }

    if (payload.messages) {
      this.messages().set(payload.messages, { parse: true });
      delete payload.messages;
    }

    return payload;
  }

});
