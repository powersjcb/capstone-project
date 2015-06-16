class ChatbotService

  # def initialize(user_input)
  #   @user_input = user_input
  # end
  #
  # def respond
  #   parsed_input = parse_input
  #   if parsed_input
  #     return get_youtube_url(parsed_input)
  #   else
  #     #select random response
  #     return "hi there, i'm a homebrew youtube search bot, post a message like 'video: funny cats'"
  #   end
  # end
  #
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
