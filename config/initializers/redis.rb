if Figaro.env.REDISCLOUD_URL
  $redis = Resque.redis = Redis.new(url: Figaro.env.REDISCLOUD_URL)
end
