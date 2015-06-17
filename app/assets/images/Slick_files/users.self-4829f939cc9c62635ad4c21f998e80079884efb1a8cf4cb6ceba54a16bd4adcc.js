Slick.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: Slick.Models.User,

  comparator: function(user) {
    return user.get('username');
  },

  getOrFetch: function(id) {
    var user = this.get(id);
    var users = this;

    if (!user) {
      user = new Slick.Models.User({id: id});
      user.fetch({
        success: function() {
          users.add(user);
        }
      });
    } else {
      user.fetch();
    }
    return user;
  }

});
