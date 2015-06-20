class AddUrlToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :url, :string, default: ""
  end
end
