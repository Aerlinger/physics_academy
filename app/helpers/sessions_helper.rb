module SessionsHelper

  # cookies[:remember_token] = { value:   user.remember_token, expires: 20.years.from_now.utc }
  #def sign_in(user)
  #  cookies.permanent[:remember_token] = user.remember_token
  #  self.current_user = user
  #end
  #
  #def signed_in?
  #  !current_user.nil?
  #end
  #
  #def guest?
  #  signed_in? && current_user.guest
  #end
  #
  #def current_user=(user)
  #  @current_user = user
  #end
  #
  ##def current_user
  ##  @current_user = User.find_by_remember_token(cookies[:remember_token])
  ##end
  #
  ## A guest user is a user who has attempted challenges, but has not yet created a profile
  #def create_guest_user_if_not_signed_in
  #
  #  if signed_in?
  #    current_user
  #  else
  #    guest_user = User.new(name: "Guest", email: "guest@physicsacademy.com", password: "123456", password_confirmation: "123456")
  #    guest_user.guest = true
  #    # set a cookie for the guest user:
  #    sign_in(guest_user)
  #    guest_user
  #  end
  #
  #end
  #
  #def current_user?(user)
  #  user == current_user
  #end
  #
  #def sign_out
  #  current_user = nil
  #  cookies.delete(:remember_token)
  #end
  #
  #def store_location
  #  session[:return_to] = request.fullpath
  #end
  #
  #def redirect_back_or(default)
  #  redirect_to(session[:return_to] || default)
  #  session.delete(:return_to)
  #end
  #
  #def signed_in_user
  #  unless signed_in?
  #    store_location
  #    redirect_to signin_path, notice: "Please sign in."
  #  end
  #end

end
