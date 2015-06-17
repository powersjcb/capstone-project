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

  belongs_to :user
  belongs_to :conversation, inverse_of: :subscriptions

end
