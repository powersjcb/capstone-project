# == Schema Information
#
# Table name: conversations
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Conversation < ActiveRecord::Base

  validates :title, :user_id, presence: true

  belongs_to :creator, class_name: "User", inverse_of: "created_chats"
  has_many :messages
  has_many :subscriptions
  has_many :subscribers, through: :subscriptions, source: :user


end
