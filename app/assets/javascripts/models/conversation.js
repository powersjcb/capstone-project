Slick.Models.Conversation = Backbone.Model.extend({
  urlRoot: "/api/conversations",


  users: function() {
    if (this._users) {
      return this._users;
    }
    this._users = new Slick.Collections.Users({}, {conversation: this});
    return this._users;
  },

  messages: function() {
    if (this._messages) {
      return this._messages;
    }
    this._messages = new Slick.Collections.Messages({},{conversation: this});
    return this._messages;
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
    return payload;
  }

});
