class AddGroupIdToConversations < ActiveRecord::Migration
  def change
    add_column :conversations, :group_id, :integer, null: false
  end
end
