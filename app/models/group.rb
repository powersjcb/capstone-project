# == Schema Information
#
# Table name: groups
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  description :string           not null
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Group < ActiveRecord::Base
  validates :description, :user_id, presence: true
  validates :name, presence: true, allow_blank: false, uniqueness: true

  has_many :memberships, dependent: :destroy, inverse_of: :group
  has_many :members, through: :memberships, source: :user
  has_many :conversations, dependent: :destroy
  has_many :messages, through: :conversations, source: :messages, dependent: :destroy

  belongs_to :user


  after_save :create_base_channels

  def public_conversations
    Conversation.where(group_id: id, privacy_state: 0)
  end

  def has_member?(user)
    self.members.include?(user)
  end

  private
  def create_base_channels
    Conversation.create(title: "general", user_id: user_id, group_id: id)
    Conversation.create(title: "random", user_id: user_id, group_id: id)
    # joining group creator to all channels
    Membership.create(user_id: user_id, group_id: id)
  end
end
