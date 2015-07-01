Slick.Models.Message = Backbone.Model.extend({
  urlRoot: "/api/messages",

  initialize: function (attrs, options) {
    if (options && options.conversation) {
      this.conversation = options.conversation;
      this.set('conversation_id', this.conversation.get('id'));
    }
  },
});


// def created_at
//   # today
//   timestamp = super()
//   timestamp_zoned = time_zoneify(timestamp, "%D%M%Y")
//   yesterday_zoned = time_zoneify(Time.zone.now - 1.day, '%D%M%Y')
//   today_zoned     = time_zoneify(Time.zone.now, "%D%M%Y")
//   if timestamp_zoned == today_zoned
//     time_zoneify(timestamp, "%I:%M %p")
//   elsif timestamp_zoned == yesterday_zoned
//     time_zoneify(timestamp, "yesterday at %I:%M %p")
//   else # other days
//     time_zoneify(timestamp, "%b %m, %Y %I:%M %p")
//   end
// end
