Slick.Collections.Conversations = Backbone.Collection.extend({
  url: "/api/conversations",
  model: Slick.Models.Message,

  comparator: function(conversation) {
    return conversation.get('id');
  },

  getOrFetch: function(id) {
    var conversation = this.get(id);
    var conversations = this;

    if (!conversation) {
      conversation = new Slick.Models.Conversation({id: id});
      conversation.fetch({
        success: function() {
          conversations.add(conversation);
        }
      });
    } else {
      conversation.fetch();
    }
    return conversation;
  },
});
