window.Slick = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    window.appHistory = [];
    window.router = new Slick.Routers.Router({
      $rootEl: $('#content')
    });
    Backbone.history.start();
  }
};
