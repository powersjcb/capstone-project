Slick.Views.ConversationForm = Backbone.CompositeView.extend({

  template: JST['conversations/form'],

  tagName: "div",
  className: "modal-container",

  events: {
    "click .close": "close",
    "submit": "submitForm"
  },

  submitForm: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    this.model.save(attrs, {
      success: this.handleSuccess
    });
  },

  handleSuccess: function () {
    this.collection.add(this.model);

    // TODO: style this out of page with sliding effect
    this.remove();
  },

  render: function () {
    var content = this.template({
      conversation: this.model
    });
    this.$el.html(content);
    return this;
  },

});
