json.extract! @group, :id, :name, :description, :created_at, :updated_at

json.first_conv_id @group.conversations.first.id
