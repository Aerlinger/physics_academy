class ApplicationController < ActionController::Base

  include SessionsHelper

  protect_from_forgery

  def after_sign_in_path_for(resource)
  # Custom devise action
    @user = User.find_by_email(params[:user][:email])
    promote_guest_to_user resource
    #redirect_back_or resource
  end

  def after_sign_out_path_for(resource)
    destroy_guest_user
    root_path
  end

end
