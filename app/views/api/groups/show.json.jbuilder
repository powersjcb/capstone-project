json.extract!(@group, :id, :name, :description, :created_at)
json.first_conv_id @group.conversations.first.id
json.user do
  json.extract!(@group.user, :id, :username, :profile_img_url)
end

json.members @group.members do |member|
 json.id member.id
 json.username member.username
 json.updated_at member.updated_at
 json.profile_img_url member.profile_img_url
end

json.conversations do
  json.array!(@conversations, :id, :title, :updated_at)
end
