class Api::MessagesController < Api::ApiController

  def index
    @messages = Message.all
    render json: @messages
  end

  def show

  end

  def search
    search_terms = params[:search]
    @messages = Message.where('content LIKE ?', "%#{search_terms}%")
    render json: @messages
  end

  def create
    @message = current_user.sent_messages.new(msg_params);
    if @message.save
      render json: @message, status: 200
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end


  private
  def msg_params
    params.require(:message).permit(:content, :conversation_id);
  end
end
