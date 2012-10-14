source 'https://rubygems.org'


gem 'rails', '3.2.8'
gem 'bootstrap-sass'

gem 'faker', '1.0.1'
gem 'jquery-rails'
gem 'will_paginate', '3.0.3'
gem 'bootstrap-will_paginate', '0.0.5'
gem 'devise'
gem "amazon-ec2", require: "AWS"

# Deploy with Capistrano
gem 'capistrano'

group :development, :test do
  gem 'sqlite3'
  gem 'rspec-rails'
  gem 'annotate', '~>2.4.1.beta'
  gem 'guard-bundler'
  gem 'ruby-growl'
end

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier', '>= 1.0.3'
end

group :test do
  gem 'capybara', '1.1.2'
  gem 'factory_girl_rails', '1.4.0'
  gem 'cucumber-rails', '1.2.1', require: false
  gem 'database_cleaner', '0.7.0'
  gem "guard-rspec"
  gem 'guard-spork', '0.3.2'
  gem 'spork', '0.9.0'
  gem 'launchy', '2.1.0'
end

group :production do
  gem 'pg', '0.12.2'
end

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# To use debugger
# gem 'debugger'
