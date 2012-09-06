include ApplicationHelper

## ----------------------------------------------------------------
#   FLASH message loggers
## ----------------------------------------------------------------

RSpec::Matchers.define :have_error_message do |message|
  match do |page|
    page.should have_selector('.alert.alert-error')
  end
end

RSpec::Matchers.define :have_info_message do |message|
  match do |page|
    page.should have_selector('.alert.alert-info')
  end
end

RSpec::Matchers.define :have_success_message do |message|
  match do |page|
    page.should have_selector('.alert.alert-success')
  end
end

## ----------------------------------------------------------------
#   LOGIN matchers
## ----------------------------------------------------------------

RSpec::Matchers.define :have_default_login_links do |message|
  match do |page|
    page.should have_link("Sign in")
    page.should have_link("Create Account")
  end
end

RSpec::Matchers.define :have_guest_login_links do |message|
  match do |page|
    page.should have_link("guest_login")
  end
end

RSpec::Matchers.define :show_user_in_header do |message|
  match do |page|
    page.should have_link("Profile")
    page.should have_link("Settings")
    page.should have_link("Sign out")
  end
end

## ----------------------------------------------------------------
#   HELPER Methods
## ----------------------------------------------------------------

def sign_out_user
  delete destroy_user_session_path
end

def sign_in(user)
  visit new_user_session_path

  fill_in "Email", with: user.email
  fill_in "Password", with: user.password
  click_button "Sign in"

  # Sign in when not using Capybara:
  cookies[:remember_token] = user.remember_token
end

def create_user(user)
  visit new_user_registration_path

  fill_in "Name", with: user.username
  fill_in "Email", with: user.email
  fill_in "Password", with: user.password
  fill_in "Confirmation", with: user.password_confirmation

  click_button "Sign Up"
end


