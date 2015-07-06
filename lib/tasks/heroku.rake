namespace :heroku do

    task :reset_db do
      puts 'Reseting database and seeding'
        run_command("pg:reset #{Figaro.env.PG_DATABASE}")
      puts 'Reset complete'
    end

    def build_command(cmd)
      "heroku #{cmd}"
    end

    def run_command(cmd)
      Bundler.with_clean_env do
        sh build_command(cmd)
      end
    end
