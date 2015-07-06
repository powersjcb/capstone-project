# lib/tasks/scheduler.rake
desc "This task is called by the Heroku scheduler add-on and resets the db"
task reset_db: :environment do
  puts 'Reseting database to stock'

  puts 'Done'
end
