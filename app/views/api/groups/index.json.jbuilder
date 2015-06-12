json.array! @groups do |group|
  json.extract!(group, :id, :name, :description, :created_at)
  json.first_conv_id group.conversations.first.id
end
