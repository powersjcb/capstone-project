Slick.Models.Message = Backbone.Model.extend({
  urlRoot: "/api/messages",

  initialize: function (attrs, options) {
    if (options.conversation) {
      console.log(options.conversation.get('id'));
      this.conversation = options.conversation;
      this.set('conversation_id', options.conversation.get('id'));
    }
  },
});
