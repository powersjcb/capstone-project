# lib/tasks/scheduler.rake
desc "This task is called by the Heroku scheduler add-on and resets the db"
task reset_db: :environment do
  puts 'Reseting database to stock'
    run_command("pg:reset #{Figaro.env.PG_DATABASE}")
  puts 'Done'
end
