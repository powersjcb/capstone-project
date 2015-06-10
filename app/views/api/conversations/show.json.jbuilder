json.extract!(@conversation, :id, :title, :user_id, :created_at, :updated_at)

json.messages @conversation.messages do |message|
  json.id         message.id
  json.content    message.content
  json.sender_id  message.sender_id
  json.created_at message.created_at

end

json.users @active_users do |user|
  json.id        user.id
  json.username  user.username
end
