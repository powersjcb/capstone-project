# == Schema Information
#
# Table name: memberships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  group_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Membership < ActiveRecord::Base
  validates :user_id, :group_id, presence: true
  validates(
    :user_id,
    uniqueness: { scope: :group_id,
    message: "needs to be unique" }
  )

  after_commit :subscribe_public_conversations, on: :create
  after_commit :alert_group, on: :create

  belongs_to :user
  belongs_to :group

  private

  def alert_group
    Pusher["group-#{self.group_id}"].trigger('new_member', self.user.as_json )
  end

  def subscribe_public_conversations
    # selects all public conversations and joins them
    public_convs = Conversation.where(
      group_id: group_id, privacy_state: 0)
    public_convs.each do |conv|
      Subscription.create(user_id: user_id,
        conversation_id: conv.id)
    end
  end


end
