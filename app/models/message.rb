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
#  socket_id       :string           default(""), not null
#  url             :string           default("")
#

class Message < ActiveRecord::Base
  validates :content, :sender_id, :conversation_id, presence: true
  validates :content, allow_blank: false, length: {maximum: 32_767}
  validate :user_in_conversation

  default_scope { order('created_at desc') }

  belongs_to(:sender,
    class_name: "User",
    foreign_key: :sender_id,
    inverse_of: :sent_messages)
  belongs_to :conversation

  after_commit :alert_conversation
  # send a single ping to group with only msg_id and channel_id
  # this will show missed messages
  # after_commit :alert_group


  private

  def alert_conversation
    WebsocketService.new({
      channel_name: "presence-conversation-#{conversation_id}",
      event_name: "new_message",
      data: self.as_json
    }).send
  end


  def user_in_conversation
    unless sender.conversations.include?(self.conversation)
      @sender.errors[:base] << "This user is not subscribed to this conversation"
    end
  end
end
