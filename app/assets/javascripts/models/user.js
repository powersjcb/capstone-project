Slick.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",


  conversations: function () {
    // if (this._conversations) {
    //   return this._conversations;
    // }
    // this._conversations = new Slick.Collections.Conversations({user: this});
    // return this._conversations;
  }
});
