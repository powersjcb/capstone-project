class Api::ConversationsController < Api::ApiController
  def show
    @conversation = Conversation.includes(:messages,
    messages: :sender).find(params[:id])

    @active_users = @conversation.messages.inject([]) do |c, message|
      c.push(message.sender)
    end.uniq

    render :show
  end

  def create
    @conversation = current_user.created_chats.new(conv_params)
    
    if @conversation.save
      render json: @conversation
    else
      render json: @conversation.errors, status: :unprocessable_entity
    end
  end

  private
  def conv_params
    params.require(:conversation).permit(:title, :description, :group_id)
  end
end
