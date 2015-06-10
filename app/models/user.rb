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
#

class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: {message: "Password can't be blank"}
  before_save :ensure_session_token


  has_many :sent_messages, class_name: "Message", foreign_key: :sender_id
  has_many :created_chats, class_name: "Conversation", inverse_of: "creator"


  def self.find_by_credentials(username, password)
    @user = User.find_by(username: username)
    if @user.is_password?(password)
      return @user
    end

    nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
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
    self.session_token = User.generate_session_token
  end
end
