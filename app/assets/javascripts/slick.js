window.Slick = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    window.appHistory = [];
    var router = new Slick.Routers.Router({
      $rootEl: $('#content')
    });
    Backbone.history.start();
  }
};
