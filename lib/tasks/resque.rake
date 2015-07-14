require 'resque/tasks'

task 'resque:setup' => :environment


# require 'resque/tasks'
# require 'resque/scheduler/tasks'
#
# task 'resque:setup' => :environment
#
# namespace :resque do
#   task :setup do
#     require 'resque'
#
#     Resque.redis = Figaro.env.REDIS_SERVER
#   end
#
#   task :setup_schdule => :setup do
#     require 'resque-scheduler'
#
#     # Resque::Schduler.dynamic = true
#     Resque.schedule = YAML.load_file('resque_schdule.yml')
#     require 'jobs'
#   end
#
#   task :scheduler => :setup_schdule
# end
