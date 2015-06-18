class Api::ConversationsController < Api::ApiController
  def show
    @conversation = Conversation.includes(:subscribers).find(params[:id])

    if current_user.subscriptions.find_or_create_by(conversation: @conversation)

      @messages = @conversation.messages.page(1)
      @subscribers = @conversation.subscribers
      render :show
    else
      render json: {errors: "You are not subscribed to this channel"}, status: 403
    end
  end

  def messages
    @conversation = Conversation.find(params[:id])
    @messages = @conversation.messages.page(params[:page])

    render json: @messages
  end

  def create
    if permitted_to_create?
      @conversation = current_user.created_chats.find_or_create_by(conv_params)
      if @conversation.save
        render json: @conversation
      else
        render json: @conversation.errors, status: :unprocessable_entity
      end
    else
      render json: {errors: "You are not a member of this group"}, status: 403
    end
  end

  private
  def conv_params
    params.require(:conversation).permit(:title, :description, :group_id)
  end

  def permitted_to_create?
    current_user.is_member_of?(Group.find(conv_params[:group_id]))
  end
end
