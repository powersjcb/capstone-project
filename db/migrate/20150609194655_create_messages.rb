class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :content, null: false, limit: 32_767
      t.integer :sender_id, null: false
      t.integer :conversation_id, null: false

      t.timestamps null: false
    end

    add_index :messages, :sender_id
    add_index :messages, :conversation_id
  end
end
