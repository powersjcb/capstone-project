require 'rails_helper'

RSpec.describe Message, type: :model do
  let(:user) { User.create(username: "tester1", password: "Passw0rd") }
  let(:group) do
    user.created_groups.create(name: "TestGroup1", description: "a group")
  end
  let(:conversation) do
    Conversation.create(creator: user, title: "TestGroup1", group: group)
  end
  before do
    user.join(group)
    user.join(conversation)
  end


  it "is invalid with blank input" do
    expect(Message.new).to be_invalid
  end

  it "is valid with valid input" do
    new_message = Message.new(content: "test 1", sender: user, conversation: conversation)

    expect(new_message).to be_valid
  end

end
