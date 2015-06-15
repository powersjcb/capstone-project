class AddCallbackidToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :callback_id, :string, null: false, default: ""
  end
end
