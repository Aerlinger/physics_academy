# It's a good idea to run the prune task regularly. Set a daily cron job to run this command to remove stale sessions.
#       rake sessions:prune RAILS_ENV=production

namespace :sessions do
  desc "Count database sessions"
  task :count => :environment do
    count = CGI::Session::ActiveRecordStore::Session.count
    puts "Sessions stored: #{count}"
  end
  desc "Clear database-stored sessions older than two weeks"
  task :prune => :environment do
    CGI::Session::ActiveRecordStore::Session.delete_all ["updated_at < ?", 2.weeks.ago]
  end
end