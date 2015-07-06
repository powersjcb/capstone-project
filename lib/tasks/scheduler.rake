# lib/tasks/scheduler.rake
desc "This task is called by the Heroku scheduler add-on and resets the db"
  task reset_db: :environment do
    Rake::Task["heroku.reset_db"].invoke if Time.now.sunday?
  end
