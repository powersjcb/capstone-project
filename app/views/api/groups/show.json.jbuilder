json.extract!(@group, :id, :name, :description, :created_at)
json.first_conv_id @group.conversations.first.id
json.user do
  json.extract!(@group.user, :id, :username, :profile_img_url)
end

json.members do
  json.array!(@group.members, :id, :username, :updated_at, :profile_img_url)
end

json.conversations do
  json.array!(@conversations, :id, :title, :updated_at)
end

json.personal_conversations do
  json.array!(@personal_conversations, :id, :title)
end
