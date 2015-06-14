require 'pusher'


Pusher.app_id = Figaro.env.PUSHER_APP_ID!
Pusher.key = Figaro.env.PUSHER_KEY!
Pusher.secret = Figaro.env.PUSHER_SECRET!
Pusher.logger = Rails.logger
