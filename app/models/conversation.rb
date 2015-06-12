# == Schema Information
#
# Table name: conversations
#
#  id            :integer          not null, primary key
#  title         :string           not null
#  user_id       :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  privacy_state :integer          default(0), not null
#  group_id      :integer          not null
#

### privacy_state: 0 - public, 1 - private chat, 2 - private group chat
class Conversation < ActiveRecord::Base

  validates :title, :user_id, presence: true

  belongs_to :creator, class_name: "User", inverse_of: "created_chats"
  belongs_to :group
  has_many :messages
  has_many :subscriptions
  has_many :subscribers, through: :subscriptions, source: :user

  after_save :subscribe_users_if_public

  private
  def subscribe_users_if_public
    if privacy_state == 0
      self.group.members.each do |member|
        member.subscriptions.create(conversation_id: id)
      end
    end
  end

  def is_group_member
    user = User.find(user_id)
    group = Group.find(id)
    unless user & user.is_member?(group)
      errors[:base] << "You are not a member of this group"
    end
  end

end
