##
#  Three possible login states
#  1. Not logged in
#  2. Logged in as a guest (When new user has started a lesson, but has not yet created an account)
#  3. Logged in as a current_user
#
#  @author: Anthony Erlinger
##
module SessionsHelper


  # Find guest_user associated with the current session, creating one if a guest does not already exist
  def find_or_create_guest_user
    guest_user || create_guest_user
  end

  # Find guest_user from given uuid
  def guest_user
    User.find_by_lazy_id(cookies[:uuid])
  end

  # Returns true if a guest user is logged in
  def guest_user?
    !cookies[:uuid].nil? && !user_signed_in?
  end


  # if user is logged in, return current_user, else return guest_user
  def current_or_guest_user
    current_user || User.find_by_lazy_id(cookies[:uuid])
  end

  # Returns true if the user is signed in as either a current_user or guest_user
  def current_or_guest_user?
    !current_or_guest_user.nil?
  end

  # Same as current_or_guest user but creates a guest user if one does not exist
  def current_or_guest_user!
    if current_user
      if cookies[:uuid]

        # Called when a guest user is converted to current user
        convert_guest_to_user(guest_user, current_user)

        # destroy the guest user and the session
        destroy_guest_user
      end
      current_user
    else
      find_or_create_guest_user
    end
  end


  # Stores current location in local session
  def store_location
    session[:return_to] = request.fullpath
  end

  # Redirects to default if no location is stored is stored
  def redirect_back_or(default)
    redirect_to(session[:return_to] || default)
    session.delete(:return_to)
  end


  private

    # Called (once) when the user logs in, insert any code your application needs
    # to hand off from guest_user to current_user.
    #
    # There can be two cases where this method is called
    #   1. User starts working (but not signed in) and signs into their existing account. This method will safely
    #       Merge their progress to their account.
    #   2. User starts working and creates a new account. Their progress will become saved to their account.
    #
    def convert_guest_to_user(guest, user)
      # What should be done here is take all that belongs to user with lazy_id matching current_user's uuid cookie...
      #   then associate them with current_user

      # Copy the subscription data from the guest user to the newly created user:

      current_user.subscriptions = guest.subscriptions.dup

      # For example:
      # guest_comments = guest_user.comments.all
      # guest_comments.each do |comment|
      # comment.user_id = current_user.id
      # comment.save
      # end
    end

    # Destroys the current guest_user from the database and destroys the guest_user cookie (cookie[:uuid]). Returns
    # false if no guest is found.
    def destroy_guest_user
      if guest_user?
        guest_user.destroy
        cookies.delete :uuid
        true
      else
        false
      end
    end

    # Creates a new guest user and saves it to the database. This consists of the following steps
    #   1.) create unique user id (uuid)
    #   2.) create unique email field based on uuid
    #   3.) save this unique guest user to the database
    #   4.) create a cookie on the guest user's browser with that uuid
    def create_guest_user
      uuid = rand(36**64).to_s(36)
      temp_email = "guest_#{uuid}@guest_user.com"
      u = User.create(name: "GUEST", username: "Guest #{User.guests.size}", email: temp_email, lazy_id: uuid)
      cookies[:uuid] = { value: uuid, path: '/', expires: 5.years.from_now }
      u.save(validate: false)
      u
    end

end
