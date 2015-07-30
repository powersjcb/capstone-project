require 'rails_helper'

RSpec.describe Message, type: :model do
  let(:subject) { Message }

  it "is invalid with blank input" do
    expect(subject.new).to be_invalid
  end

  it "is valid with valid input" do
    # new_sub = subject.new(username: "ThatUserName", password: "Passw0rd")
    # expect(new_sub).to be_valid
  end



end
