# Load the rails application
require File.expand_path('../application', __FILE__)

# Use the database for sessions instead of the file system
# (create the session table with 'rake db:sessions:create')
# config.action_controller.session_store = :active_record_store

# Load custom config file for current environment
#raw_config = File.read(RAILS_ROOT + "/config/config.yml")
#APP_CONFIG = YAML.load(raw_config)[RAILS_ENV]

# Anywhere in your application, you can now access the configuration settings for
#  the current environment with a simple lookup like this:
#APP_CONFIG['flickr_api']['key']

# Initialize the rails application
PhysicsAcademy::Application.initialize!
