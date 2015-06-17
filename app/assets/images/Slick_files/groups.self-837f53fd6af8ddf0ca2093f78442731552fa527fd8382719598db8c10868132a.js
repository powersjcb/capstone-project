Slick.Collections.Groups = Backbone.Collection.extend({
  url: "/api/groups",
  model: Slick.Models.Group,

  comparator: function(group) {
    return group.get('created_at');
  },

  getOrFetch: function(id) {
    var group = this.get(id);
    var groups = this;

    if (!group) {
      group = new Slick.Models.Group({id: id});
      group.fetch({
        success: function() {
          groups.add(group);
        }
      });
    } else {
      group.fetch();
    }
    return group;
  }

});
