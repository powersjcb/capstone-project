Slick.Views.Menu = Backbone.CompositeView.extend({
  template: JST['users/menu'],
  tagName: "div",
  className: "modal-container",

  events: {
    'click #change-profile-img': "uploadPrompt",
    'click': "remove"
  },

  initialize: function (options) {
    this.conversation = options.conversation;
    this.model = Slick.Models.currentUser;
  },

  render: function () {
    var content = this.template({user: this.model });
    this.$el.html(content);
    return this;
  },

  uploadPrompt: function () {
    this.model = this.conversation.subscribers().get(this.model.get('id'));
    var cloud_base = "http://res.cloudinary.com/slickapp-io/image/upload";
    var settings = "/w_40,h_40,c_fit/"; // fits within 40px, scale prop.
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result){
      if (result) {
        var data = result[0];
        var thumb_url = cloud_base + settings + data.path;
        this.model.set('profile_img_url', thumb_url);
        this.model.save();
        this.remove();
      }
    }.bind(this));
  }


});