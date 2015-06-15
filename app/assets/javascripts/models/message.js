Slick.Models.Message = Backbone.Model.extend({
  urlRoot: "/api/messages",

  initialize: function (attrs, options) {
    if (options && options.conversation) {
      this.conversation = options.conversation;
      this.set('conversation_id', options.conversation.get('id'));
    }
  },
});
