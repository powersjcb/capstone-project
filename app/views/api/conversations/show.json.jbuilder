json.extract!(@conversation, :id, :title, :user_id, :created_at, :updated_at)
json.total_pages @messages.total_pages

json.messages @messages do |message|
  json.id         message.id
  json.content    message.content
  json.sender_id  message.sender_id
  json.created_at message.created_at
end

json.subscribers @subscribers do |user|
  json.id        user.id
  json.username  user.username
  json.profile_img_url user.profile_img_url
end
