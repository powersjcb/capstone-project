# == Schema Information
#
# Table name: messages
#
#  id              :integer          not null, primary key
#  content         :text             not null
#  sender_id       :integer          not null
#  conversation_id :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Message < ActiveRecord::Base
  validates :content, :sender_id, :conversation_id, presence: true
  validates :content, allow_blank: false, length: {maximum: 32_767}

  belongs_to :user, foreign_key: :sender_id
  # belongs_to :conversation

end
