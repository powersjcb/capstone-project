Slick.Collections.Messages = Backbone.Collection.extend({
  url: "/api/messages",
  model: Slick.Models.Message,

  comparator: function(message) {
    return message.get('created_at');
  },

  getOrFetch: function(id) {
    var message = this.get(id);
    var messages = this;

    if (!message) {
      message = new Slick.Models.Message({id: id});
      message.fetch({
        success: function() {
          messages.add(message);
        }
      });
    } else {
      message.fetch();
    }
    return message;
  }

});
