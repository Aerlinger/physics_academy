class ApplicationController < ActionController::Base

  include SessionsHelper

  protect_from_forgery
  before_filter :generate_quote
  helper_method :current_or_guest_user, :guest_user?

  # if user is logged in, return current_user, else return guest_user
  def current_or_guest_user
    if current_user
      if session[:guest_user_id]
        # Called when a new login is created from a guest user's current session (i.e. guest user is converted to current user)
        logging_in
        # destroy the guest user and the session
        guest_user.destroy
        session[:guest_user_id] = nil
      end
      current_user
    else
      guest_user
    end
  end

  # find guest_user object associated with the current session,
  # creating one as needed
  def guest_user
    User.find_by_lazy_id(cookies[:uuid].nil? ? create_guest_user.lazy_id : cookies[:uuid])
  end

  def guest_user?
    !cookies[:uuid].nil? && session[:guest_user_id]
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


    def create_guest_user
      uuid = rand(36**64).to_s(36)
      temp_email = "guest_#{uuid}@guest_user.com"
      u = User.create(:email => temp_email, :lazy_id => uuid)
      u.save(:validate => false)
      cookies[:uuid] = { :value => uuid, :path => '/', :expires => 5.years.from_now }
      u
    end
end
