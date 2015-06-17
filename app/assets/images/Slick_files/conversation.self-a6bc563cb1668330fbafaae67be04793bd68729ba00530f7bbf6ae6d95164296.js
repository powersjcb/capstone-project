Slick.Models.Conversation = Backbone.Model.extend({
  urlRoot: "/api/conversations",

  users: function() {
    if (this._users) {
      return this._users;
    }
    this._users = new Slick.Collections.Users();
    return this._users;
  },

  messages: function() {
    if (this._messages) {
      return this._messages;
    }
    this._messages = new Slick.Collections.Messages({},{conversation: this});
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
    if(payload.users) {
      this.users().set(payload.users, { parse: true });
      delete payload.users;
    }
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
