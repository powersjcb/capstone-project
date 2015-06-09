class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.string  :title, null: false
      t.integer :user_id, null: false


      t.timestamps null: false
    end

    add_index :conversations, :title
    add_index :conversations, :user_id
  end
end
