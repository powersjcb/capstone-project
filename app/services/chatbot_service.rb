class ChatbotService
  def initialize(params)
    @user = Figaro.CLEVERBOT_IO_USER
    @key  = Figaro.CLEVERBOT_IO_API_KEY
    @nick = params[:user].username
    @conversation_id = params[:conversation].id
  end

  # def


end
