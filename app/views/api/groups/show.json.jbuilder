json.extract!(@group, :id, :name, :description, :created_at)
json.user do
  json.extract!(@group.user, :id, :username)
end

json.members do
  json.array!(@group.members, :id, :username, :updated_at)
end

json.conversation do
  json.extract!(@conversation, :id, :title, :user_id, :created_at, :updated_at, :privacy_state )
  json.messages @conversation.messages do |message|
    json.extract!(message, :id, :content, :sender_id, :created_at)
  end
end

json.conversations do
  json.array!(@conversations, :id, :title, :updated_at)
end
