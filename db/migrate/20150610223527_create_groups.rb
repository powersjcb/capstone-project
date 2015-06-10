class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :groups, :name, unique: true
    add_index :groups, :user_id
  end
end
