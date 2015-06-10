# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#

user = User.create(username: "powersjcb", password: "password" )
group = user.created_groups.create(name: "Group1", description: "First group")
user.created_chats.create(title: "chat group1", group_id: 1)
#
50.times do
  content = Faker::Hacker.say_something_smart
  user.sent_messages.create!(content: content, conversation_id: 1)
end
