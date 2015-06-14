# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  profile_img_url :string           default(""), not null
#

class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: {message: "Password can't be blank"}
  after_initialize :ensure_session_token


  has_many(
    :sent_messages,
    class_name: "Message",
    foreign_key: :sender_id,
    inverse_of: :sender
  )
  has_many :created_chats, class_name: "Conversation", inverse_of: "creator"
  has_many :created_groups, class_name: "Group"

  has_many :subscriptions, dependent: :destroy
  has_many :conversations, through: :subscriptions, source: :conversation

  has_many :memberships, dependent: :destroy
  has_many :groups, through: :memberships, source: :group


  def self.find_by_credentials(username, password)
    @user = User.find_by(username: username)
    if @user && @user.is_password?(password)
      return @user
    end
    nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def is_member_of?(group)
    self.groups.include?(group)
  end

  def private_conversation_with(other_user, group)

  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save

    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
