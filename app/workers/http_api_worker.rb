class BotWorker
  @queue = :bot_response

  def self.perform(message, conversation)
    process = ChatbotService.new(message, conversation)
    process.respond
  end
end
