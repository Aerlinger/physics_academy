class UsersController < Devise::RegistrationsController


  before_filter :correct_user,   only: [:show, :edit, :update]
  before_filter :admin_user,     only: [:index, :edit, :update, :destroy]

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

  # POST /users
  # POST /users.json
  def create

    @user = User.new(params[:user])

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user }
        format.json { render json: @user }
      else
        flash.now[:error] = "Invalid email or password."
      end
    end

  end

  # GET /users/1/edit
  def edit
  end

  # PUT /users/1
  # PUT /users/1.json
  def update

    if @user.update_attributes(params[:user])
      sign_in @user
      flash[:success] = "Profile updated"
      redirect_to @user
    else
      render 'edit'
    end

  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end


  protected

    def after_sign_up_path_for(resource)
      convert_guest_to_user resource
    end

  private

    # Called only on edit/update action
    def correct_user
      #@user = User.find(params[:id])
      #redirect_to root_path, alert: "You do not have access to that page" unless current_user == @user
    end

    def admin_user
      redirect_to root_path, alert: "You must be an Administrator to do that" unless current_user.admin?
    end


end