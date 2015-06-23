require 'pusher'

class WebsocketService
  def initialize(params)
    @channel_name = params[:channel_name]
    @event_name   = params[:event_name]
    @data         = params[:data]
  end

  def send
    begin
      Pusher.trigger(@channel_name, @event_name, @data)
    rescue Pusher::Error => e
# rescue stuff
    end
  end

end
