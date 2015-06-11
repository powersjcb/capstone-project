Slick.Models.Group = Backbone.Model.extend({
  urlRoot: "/api/groups",

  creator: function () {
    if (!this._creator) {
      this._creator = new Slick.Models.User();
    }
    return this._creator;
  },

  members: function () {
    if (!this._members) {
      this._members = new Slick.Collections.Users();
    }
    return this._members;
  },

  conversations: function () {
    if (!this._conversations) {
      this._conversations = new Slick.Collections.Conversations();
    }
    return this._conversations;
  },

  conversation: function () {
    if (!this._conversation) {
      this._conversation = new Slick.Models.Conversation();
    }
    return this._conversation;
  },

  parse: function (payload) {

    // get creator
    if (payload.user) {
      this.creator().set(payload.user, {parse: true});
      delete payload.user;
    }

    // get group members
    if (payload.members) {
      this.members().set(payload.members, {parse: true});
      delete payload.members;
    }

    // get conversation
    if (payload.conversation) {
      this.conversation().parse(payload.conversation);
      this.conversation().set(payload.conversation, {parse: true});
      delete payload.conversation;
    }

    // get subscribed conversations
    if (payload.conversations) {
      this.conversations().set(payload.conversations, {parse: true});
      delete payload.conversations;
    }
    return payload;
  }

});
