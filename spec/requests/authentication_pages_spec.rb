require 'spec_helper'

describe "Authentication Pages" do

  subject { page }

  describe "sign in page" do
    before { visit new_user_session_path }

    # Check page selectors:
    it { should have_selector('h1', text: 'Sign In') }
  end

  describe "Sign In" do

    before { visit new_user_session_path }

    describe "with invalid information" do
      before { click_button "Sign in" }

      # stays on the same page
      it { should have_selector('h1', text: 'Sign In') }
      # Signing in without information should give an error
      it { should have_error_message }

      # The site shouldn't have an error message after visiting another page
      describe "after visiting another page" do
        before { find("#logo").click }
        it { should_not have_error_message }
      end
    end

    describe "with valid information" do
      let(:user) { FactoryGirl.create(:user) }
      before { sign_in user }

      # When signing in with a new user, make sure the links are correct on the page
      #it { should have_selector('title', text: user.name) }
      it { should have_link('Profile',  href: user_path(user)) }
      it { should have_link('Sign out', href: destroy_user_session_path) }
      it { should have_link('Settings', href: edit_user_registration_path(user)) }
      xit { should have_link('Users', href: users_path) }
      it { should_not have_link('Sign in', href: new_user_session_path) }

      # Signing out again should modify the page:
      describe "followed by sign-out" do
        before { click_link "Sign out" }
        it { should have_link('Sign in')}
      end

    end
  end

  describe "authorization" do

    describe "for non-signed-in users" do
      let(:user) { FactoryGirl.create(:user) }

      describe "when attempting to visit a protected page" do

        before do
          visit edit_user_path(user)
          fill_in "Email", with: user.email
          fill_in "Password", with: user.password
          click_button "Sign in"
        end

        pending "after signing in", :type => :controller do

          describe "should render the desired protected page" do
            before { click_button "Sign up" }
            it { should have_selector('title', text: 'Edit user' ) }
          end

          describe "when signing in again" do
            before do
              click_link "Sign out"
              click_link "Sign in"
              fill_in "Email", with: user.email
              fill_in "Password", with: user.password
              click_button "Sign in"
            end

            it "should render the default (profile) page" do
              page.should have_selector('title', text: user.name)
            end
          end
        end

      end

      describe "in the Users controller" do

        describe "visiting the edit page" do
          before { visit edit_user_registration_path }
          it { should have_selector('title', text: 'Sign in') }
          it { should have_selector('div.alert.alert-error') }
        end

        describe "submitting to the update action" do
          #before { put user_path(user) }
          it { lambda{ put user_path(user) }.should raise_error(ActionController::RoutingError) }
          #specify { response.should redirect_to(new_user_session_path) }
        end

      end
    end

  end

  describe "as wrong user" do
    let(:user) { FactoryGirl.create(:user) }
    let(:wrong_user) { FactoryGirl.create(:user, email: "wrong@example.com") }
    before { sign_in user }

    describe "visiting Users#edit page" do
      before { visit edit_user_registration_path(wrong_user) }
      it { should_not have_selector('title', text: 'Edit user') }
    end

    describe "submitting a PUT request to the Users#update action" do
      pending
      #specify { response.should redirect_to(root_path) }
    end
  end

  describe "as non-admin user" do
    let(:user) { FactoryGirl.create(:user) }
    let(:non_admin) { FactoryGirl.create(:user) }

    before { sign_in non_admin }

    describe "submitting a DELETE request to the Users#destroy action" do
      before { delete destroy_user_session_path }
      it "should redirect to root" do
          response.should redirect_to(root_path)
      end
    end
  end

end
