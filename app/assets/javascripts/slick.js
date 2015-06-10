window.Slick = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var messages = new Slick.Collections.Messages();

    var router = new Slick.Routers.Router({
      $rootEl: $('#content')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Slick.initialize();
});
