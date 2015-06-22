class Api::MessagesController < Api::ApiController

  def index
    @messages = Message.all
    render json: @messages
  end

  def show
    if in_conversation?
      @message = Message.find(params[:id])
      render json: @message
    else
      render json: {errors: "You are not part of this conversation"}, status: 403
    end
  end

  def search
    ## should only show visible messages - ask eric about lambdas for associations
    search_terms = params[:search]
    @messages = Message.where('content LIKE ?', "%#{search_terms}%")
    render json: @messages
  end

  def create
    if in_conversation?
      @message = current_user.sent_messages.new(msg_params);
      if @message.save
        maybe_bot_response(@message)
        render json: @message, status: 200
      else
        render json: @message.errors, status: :unprocessable_entity
      end
    else
      render json: {errors: "You are not part of this conversation"}, status: 403
    end
  end


  private
  def msg_params
    params.require(:message).permit(:content, :conversation_id, :socket_id, :url);
  end

  def in_conversation?
    if params[:id]
      conv_id = Message.find(params[:id]).conversation.id
    else
      conv_id = msg_params[:conversation_id]
    end
    current_user.is_in_conversation?(conv_id)
  end

  def maybe_bot_response(message)
    if message.conversation
      ChatbotService.new(message).respond
    end
  end
end
