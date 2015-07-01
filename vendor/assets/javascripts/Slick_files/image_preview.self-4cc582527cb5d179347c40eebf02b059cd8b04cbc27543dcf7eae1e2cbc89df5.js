Slick.Views.ImagePreview = Backbone.View.extend({

  tagName: "img",
  attributes: function () {
    return {src: this.model.get('url')};
  },


  initialize: function () {
    this.render();
  },

  render: function () {
    return this;
  },

});
