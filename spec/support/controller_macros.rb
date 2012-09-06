module ControllerMacros

  def login_user
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:registrations]
      @request.env["devise.mapping"] = Devise.mappings[:sessions]
      user = FactoryGirl.create(:user)
      user.confirm! # or set a confirmed_at inside the factory. Only necessary if you are using the confirmable module
      sign_in user
    end
  end

  def sign_out_user
    delete destroy_user_session_path
  end
end