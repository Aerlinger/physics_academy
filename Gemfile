source 'https://rubygems.org'


# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'
gem 'rails', '3.2.4.rc1'
#gem 'therubyracer', platform: rails
#gem 'libv8', '3.3.10.4'
gem 'bootstrap-sass'

gem 'bcrypt-ruby', '3.0.1'
gem 'faker', '1.0.1'
gem 'jquery-rails'
gem 'will_paginate', '3.0.3'
gem 'bootstrap-will_paginate', '0.0.5'

group :development, :test do
  gem 'sqlite3'
  gem 'rspec-rails'
  gem 'annotate', '~>2.4.1.beta'
  gem 'guard-rspec', '1.1.0'
  gem 'guard-bundler'
  gem 'bullet'
  gem 'ruby-growl'
end

gem 'activerecord-reputation-system', require: 'reputation_system'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'

  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  gem 'uglifier', '>= 1.0.3'
end

group :test do
  gem 'capybara', '1.1.2'
  gem 'factory_girl_rails', '1.4.0'
  gem 'cucumber-rails', '1.2.1', require: false
  gem 'database_cleaner', '0.7.0'
  #gem 'growl', '1.0.3'
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

# Deploy with Capistrano
gem 'capistrano'

# To use debugger
# gem 'debugger'
