json.extract!(@group, :id, :name, :description, :created_at)
json.first_conv_id @group.conversations.first.id
json.user do
  json.extract!(@group.user, :id, :username)
end

json.members do
  json.array!(@group.members, :id, :username, :updated_at)
end

json.conversations do
  json.array!(@conversations, :id, :title, :updated_at)
end
