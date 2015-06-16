class HttpApiWorker
  @queue = :api_response

  def self.perform(params)
    process = ChatbotService.new(params)
    process.send
  end
end
