require 'pusher'

class WebsocketService
  def initialize(params)
    @channel_name = params[:channel_name]
    @event_name   = params[:event_name]
    @data         = params[:data]
  end

  def send
    Pusher.trigger(@channel_name, @event_name, @data)
  end

end
