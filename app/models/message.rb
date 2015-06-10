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
  validate :user_in_conversation

  belongs_to(:sender,
    class_name: "User",
    foreign_key: :sender_id,
    inverse_of: :sent_messages)
  belongs_to :conversation



  private
  def user_in_conversation
    # unless sender.conversations.include?(this.conversation)
      # @sender.errors[:base] << "This user is not subscribed to this conversation"
    # end
  end
end
