class Api::ConversationsController < Api::ApiController
  def show
    @conversation = Conversation.includes(:messages, :subscribers,
    messages: :sender).find(params[:id])

    if current_user.subscriptions.find_or_create_by(conversation: @conversation)
      @active_users = @conversation.messages.inject([]) do |c, message|
        c.push(message.sender)
      end.uniq
      @subscribers = @conversation.subscribers
      render :show
    else
      render json: {errors: "You are not subscribed to this channel"}, status: 403
    end
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
