class ApplicationController < ActionController::Base

  include SessionsHelper

  protect_from_forgery
  before_filter :generate_quote
  helper_method :current_user?, :current_or_guest_user, :current_or_guest_user?, :guest_user?, :sign_out_guest

  # Three possible login states
  #  1. Not logged in
  #  2. Logged in as a guest
  #  3. Logged in as a current_user

  # Returns true if the user is signed in as either a current_user or guest_user
  def current_or_guest_user?
    !current_or_guest_user.nil?
  end

  # if user is logged in, return current_user, else return guest_user
  def current_or_guest_user
    current_user || User.find_by_lazy_id(cookies[:uuid])
  end

  # same as current_or_guest user but creates a guest user if one does not exist
  def current_or_guest_user!
    if current_user
      if cookies[:uuid]
        # Called when a guest user is converted to current user
        logging_in
        # destroy the guest user and the session
        sign_out_guest
      end
      current_user
    else
      guest_user
    end
  end

  def current_user?
    !current_user.nil?
  end

  # find guest_user object associated with the current session, creating one as needed
  def guest_user
    User.find_by_lazy_id(cookies[:uuid].nil? ? create_guest_user.lazy_id : cookies[:uuid])
  end

  # True if the current user is a guest and not a signed-up user. This is only true when cookies[uuid] is null and
  # session[:guest_user_id] is false.
  def guest_user?
    !cookies[:uuid].nil? && !user_signed_in?
  end

  def sign_out_guest
    if guest_user
      guest_user.destroy
      cookies.delete :uuid
      true
    else
      false
    end
    #session[:guest_user_id] = nil
  end

  # called (once) when the user logs in, insert any code your application needs
  # to hand off from guest_user to current_user.
  def logging_in
    # What should be done here is take all that belongs to user with lazy_id matching current_user's uuid cookie... then associate them with current_user

    # Copy the subscription data from the guest user to the newly created user:
    current_user.subscriptions = guest_user.subscriptions.dup

    # For example:
    # guest_comments = guest_user.comments.all
    # guest_comments.each do |comment|
    # comment.user_id = current_user.id
    # comment.save
    # end
  end

  def generate_quote
    @quote = Quote.first(:offset => rand(Quote.count)) || Quote.create!(quote: "Tell me and I forget, teach me and I may remember, involve me and I learn", author: "Benjamin Franklin")
  end

  private

    # Creates a new guest user and saves it to the database. This consists of the following steps
    #  1.) create unique user id (uuid)
    #  2.) create unique email field based on uuid
    #  3.) save this unique guest user to the database
    #  4.) create a cookie on the guest user's browser with that uuid
    def create_guest_user
      uuid = rand(36**64).to_s(36)
      temp_email = "guest_#{uuid}@guest_user.com"
      u = User.create(:username => "Guest User", :email => temp_email, :lazy_id => uuid)
      u.save(:validate => false)
      cookies[:uuid] = { :value => uuid, :path => '/', :expires => 5.years.from_now }
      u
    end


  def after_sign_in_path_for(resource_or_scope)
    user_path(current_user)
  end
end
