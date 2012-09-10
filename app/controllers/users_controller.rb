class UsersController < Devise::RegistrationsController

  before_filter :correct_user,   only: [:show]
  before_filter :admin_user,     only: [:index, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all

    respond_to do |format|
      format.html
      format.json { render json: @users }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @user }
    end
  end


  protected

    def after_sign_up_path_for(resource)
      promote_guest_to_user resource
      user_path(resource)
    end

  private

    # Called only on edit/update action
    def correct_user
      @user = User.find(params[:id])
      redirect_to root_path, alert: "You do not have access to that page" unless current_user == @user
    end

    def admin_user
      redirect_to root_path, alert: "You must be an Administrator to do that" unless current_user.admin?
    end


end