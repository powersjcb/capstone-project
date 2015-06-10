class Api::ConversationsController < Api::ApiController
  def show
    @conversation = Conversation.includes(:messages,
    messages: :sender).find(params[:id])

    @active_users = @conversation.messages.inject([]) do |c, message|
      c.push(message.sender)
    end.uniq

    render :show
  end
end
