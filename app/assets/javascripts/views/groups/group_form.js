Slick.Views.GroupForm = Backbone.CompositeView.extend({

  template: JST['groups/form'],

  tagName: "div",
  className: "modal-container",

  events: {
    "click .close, .cancel": "remove",
    "submit": "submitForm"
  },

  submitForm: function (event) {
    event.preventDefault();
    var attrs = this.$el.find('form').eq(0).serializeJSON().group;
    this.model.set(attrs);
    this.model.save({}, {
      success: this.handleSuccess.bind(this)
    });
  },

  handleSuccess: function () {
    this.collection.add(this.model);
    $('.groups-nav').addClass('collapsed');
    var groupUrl = "groups/" + this.model.get('id') + "/conversations/" +
      this.model.get('first_conv_id');
    this.remove();
    Backbone.history.navigate(groupUrl, {trigger: true});
  },

  render: function () {
    var content = this.template({
      conversation: this.model
    });
    this.$el.html(content);
    return this;
  },

});
