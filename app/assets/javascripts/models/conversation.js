Slick.Models.Conversation = Backbone.Model.extend({
  urlRoot: "/api/conversations",


  messages: function() {
    if (this._messages) {
      return this._messages;
    }
    this._messages = new Slick.Collections.Messages({},{conversation: this});
    return this._messages;
  },

  subscribers: function () {
    if (this._users) {
      return this._users;
    }
    this._users = new Slick.Collections.Users();
    return this._users;
  },

  parse: function (payload) {
    if (payload.messages) {
      this.messages().set(payload.messages, { parse: true });
      delete payload.messages;
    }
    if (payload.subscribers) {
      this.subscribers().set(payload.subscribers, {parse: true});
    delete payload.subscribers;
    }
    return payload;
  }

});
