# == Schema Information
#
# Table name: subscriptions
#
#  id              :integer          not null, primary key
#  user_id         :integer          not null
#  conversation_id :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Subscription < ActiveRecord::Base
  validates :user_id, :conversation_id, presence: true
  validates(
    :user_id,
    uniqueness: { scope: :conversation_id,
    message: "needs to be unique"
    }
  )
  after_commit :alert_conversation, on: :create


  belongs_to :user
  belongs_to :conversation, inverse_of: :subscriptions


  def alert_conversation
    WebsocketService.new({
      channel_name: "presence-conversation-#{conversation_id}",
      event_name: "new_subscriber",
      data: self.user.as_json
    }).send
  end

end
