class AddBotStateToConversations < ActiveRecord::Migration
  def change
    add_column :conversations, :bot, :boolean, null: false, default: false
  end
end
