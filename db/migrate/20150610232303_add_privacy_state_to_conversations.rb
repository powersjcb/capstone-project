class AddPrivacyStateToConversations < ActiveRecord::Migration
  def change
    add_column :conversations, :privacy_state, :integer, null: false, default: 0
  end
end
