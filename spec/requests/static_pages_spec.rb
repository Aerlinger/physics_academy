require 'spec_helper'

describe "Static Pages" do

  subject { page }


  describe "Visit Home page" do

    before do
      sign_out_user
      visit root_path
    end

    it { should have_selector("div#extra") }
    it { should have_selector("div#footer") }
    it { should have_selector("canvas_wrapper") }
    it { should have_button("Subscribe") }

    it { should have_selector('title', text: full_title('')) }
    it { should_not have_selector('title', text: '| Home') }
    it { should have_selector('a#call_to_action_btn') }

    describe "for non-signed-in users" do
      it { should have_default_login_links }
    end

    describe "Call to action button should redirect to first lesson" do
      before { click_link("call_to_action_btn") }
      it { should have_selector('a#task_1') }
    end

    describe "for signed-in users" do
      let(:user) { FactoryGirl.create(:user) }

      before do
        sign_in user
        visit root_path
      end

      describe "Redirect to User's profile page when signing in" do
        it { have_selector('title', text: full_title('Profile'))  }
      end

      describe "Should display drop-down links" do
        it { should show_user_in_header }
      end

    end

  end


  describe "Lessons page" do
    before { visit lessons_path }

    it { should have_selector('h3', text: 'Browse By:') }
    it { should have_selector('title', text: full_title('All Lessons')) }
  end


  describe "labs page" do
    before { visit labs_path }

    it { should have_selector('h1', text: 'Labs') }
    it { should have_selector('title', text: full_title('Labs')) }
  end


  describe "About page" do
    before { visit about_path }

    it { should have_selector('h1', text: 'About Us') }
    it { should have_selector('title', text: full_title('About')) }
  end


  describe "Sign in page" do
    before { visit new_user_session_path }

    # Check page selectors:
    it { should have_selector('h1', text: 'Sign In') }

  end

  describe "Sign up page" do
    before { visit new_user_registration_path }

    it { should have_selector('h1', text: 'Sign Up') }
  end


  describe "Terms page" do
    before { visit terms_path }

    it { should have_selector('h1', text: 'Terms') }
    it { should have_selector('title', text: full_title('Terms')) }
  end


  it "should have the right links on the layout" do

    visit root_path

    click_link "Home"
    current_path.should eq(root_path)

    click_link "Sign in"
    page.should have_selector 'h1', text: 'Sign In'

    click_link "Create Account"
    page.should have_selector 'h1', text: 'Sign Up'

    click_link "Lessons"
    page.should have_selector 'title', text: full_title("All Lessons")

    click_link "Labs"
    page.should have_selector 'title', text: full_title("Labs")

    click_link "About"
    page.should have_selector 'title', text: full_title('About')

  end

end
