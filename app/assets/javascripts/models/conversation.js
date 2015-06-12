Slick.Models.Conversation = Backbone.Model.extend({
  urlRoot: "/api/conversations",
  //
  // initialize: function (attrs, options) {
  //   if (options.group) {
  //     this.set('group_id', options.group.id);
  //   }
  // },

  users: function() {
    if (this._users) {
      return this._users;
    }
    this._users = new Slick.Collections.Users({group_id: this.group.get('id')});
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
