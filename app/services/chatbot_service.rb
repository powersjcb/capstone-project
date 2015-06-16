class ChatbotService

  def initialize(message, conversation)
    @user_input = message.content
    @conversation = conversation
  end

  def formulate_response
    # parsed_input = parse_input
    # if parsed_input
      # return get_youtube_url(parsed_input)
    # else
      #select random response
      return "Hi there, I'm going to be a homebrew youtube search bot someday. You will be able to post a message like 'video: funny cats'"
    # end
  end

  def respond
    Message.create(user_id: 1, content: formulate_response,
      conversation_id: @conversation.id)
  end

  #
  # def parse_input
  #   split_input = @user_input.split('video: ')
  #   return split_input[-1] if split_input.length == 2
  # end
  #
  # def get_youtube_url(search_input)
  #   # MUST BE RUN ASYNC
  #   debugger
  #   client = YouTubeIt::Client.new(:dev_key => "AIzaSyAnJNA2HhpdzuA04ytOI1CXIOOEfPq3-kU")
  #
  #   return client.videos_by(:query => search_input)
  # end

end
