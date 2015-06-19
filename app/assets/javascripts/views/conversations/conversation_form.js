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
    setTimeout(function () {
      var route = 'groups/' + this.model.get('group_id') + "/conversations/" +
        this.model.id;
      Backbone.history.navigate(route, {trigger: true});
    }.bind(this));

    // TODO: style this out of page with sliding effect
    this.remove();
  },

  render: function () {
    var content = this.template({
      conversation: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

});
