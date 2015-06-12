Slick.Views.ConversationForm = Backbone.CompositeView.extend({

  template: JST['conversations/form'],

  tagName: "div",
  className: "modal-container",

  events: {
    "click .close, .cancel": "remove",
    "submit": "submitForm"
  },

  initialize: function (options) {
    this.user = options.users;
  },

  submitForm: function (event) {
    event.preventDefault();
    var attrs = this.$el.find('form').eq(0).serializeJSON().conversation;
    this.model.set(attrs);
    this.model.save({}, {
      success: this.handleSuccess.bind(this)
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
