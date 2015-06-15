class RenameCallbackIdToSocketId < ActiveRecord::Migration
  def change
    rename_column :messages, :callback_id, :socket_id
  end
end
