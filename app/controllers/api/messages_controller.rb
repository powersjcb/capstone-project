class Api::MessagesController < Api::ApiController

  def index
    @messages = Message.all
    render json: @messages
  end

  def show

  end

  def create
    @message = current_user.sent_messages.new(msg_params);
    if @message.save
      render json: {}, status: 200
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end


  private
  def msg_params
    params.require(:message).permit(:content, :conversation);
  end
end
