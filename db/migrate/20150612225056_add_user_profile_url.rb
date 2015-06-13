class AddUserProfileUrl < ActiveRecord::Migration
  def change
    add_column :users, :profile_img_url, :string, null: false, default: ""
  end
end
