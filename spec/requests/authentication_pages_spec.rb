require 'spec_helper'

describe "Authentication Pages" do

  subject { page }

  context "Sign In" do

    before { visit new_user_session_path }

    describe "should link to Sign up page" do
      before { click_link "Sign up" }
      it { should have_selector('title', text: full_title("Sign up")) }
      it { should have_selector('h1', text: "Sign Up") }
    end

    describe "with invalid information" do
      before do
        fill_in 'Email', with: "nonsense@nonsense.com"
        fill_in 'Password', with: "junk_nonsense_here"
        click_button "Sign in"
      end

      it { should have_error_message }
      it { should have_selector('h4') }
      it { should have_selector('h1', text: 'Sign In') }

      describe "after visiting another page" do
        before { find("#logo").click }
        it { should_not have_error_message }
      end
    end

    describe "with valid information" do
      let(:user) { FactoryGirl.create(:user) }
      before { sign_in user }

      it { should have_link('Profile', href: user_path(user)) }
      it { should have_link('Sign out', href: destroy_user_session_path) }
      it { should have_link('Settings', href: edit_user_registration_path(user)) }
      it { should_not have_link('Sign in', href: new_user_session_path) }

      describe "followed by sign-out" do
        before { click_link "Sign out" }
        it { should have_link('Sign in') }
        it { should have_info_message }
      end

    end

  end

  context "Authorization" do

    describe "for non-signed-in users" do

      before { sign_out_user }

      let(:user) { FactoryGirl.create(:user) }

      describe "when attempting to visit a protected page" do

        before { visit edit_user_registration_path }

        it { should have_error_message }
        it { current_path.should eq(new_user_session_path) }

        describe "after signing in" do

          before do
            fill_in "Email", with: user.email
            fill_in "Password", with: user.password
            click_button "Sign in"
          end

          describe "when signing in again" do
            before do
              click_link "Sign out"
              click_link "Sign in"
              fill_in "Email", with: user.email
              fill_in "Password", with: user.password
              click_button "Sign in"
            end

            it "should render the default page" do
              current_path.should eq(user_path(user))
            end

            describe "visiting home path" do
              before {click_link "Home"}
              it "should go to homepage when home is clicked" do
                current_path.should eq(root_path)
              end
            end

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

    end

  end

  context "as wrong user" do
    let(:user) { FactoryGirl.create(:user) }
    let(:wrong_user) { FactoryGirl.create(:user, email: "wrong@example.com") }
    before { sign_in user }

    describe "visiting the wrong user's show page" do
      before { visit user_path(wrong_user) }
      it { should_not have_selector('h1', text: 'User Profile') }
      it { should have_error_message }
    end

  end

  describe "as non-admin user" do
    let(:user) { FactoryGirl.create(:user) }
    let(:non_admin) { FactoryGirl.create(:user) }

    before { sign_in non_admin }

    describe "submitting a DELETE request to the Users#destroy action" do
      before { sign_out_user }
      it "should redirect to root" do
        response.should redirect_to(root_path)
      end
    end
  end

end
