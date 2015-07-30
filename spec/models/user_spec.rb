require 'rails_helper'

RSpec.describe User, type: :model do
  let(:subject) { User }
  it "is invalid with blank input" do
    expect(subject.new).to be_invalid
  end

  it "is valid with valid input" do
    new_sub = subject.new(username: "ThatUserName", password: "Passw0rd")
    expect(new_sub).to be_valid
  end

  it "creates a new users with valid credentials" do
    user_count = User.all.count
    new_sub = subject.new(username: "ThatUserName", password: "Passw0rd")

    new_sub.save

    expect(User.all.count).to eq(user_count + 1)
  end


end
