require 'spec_helper'

describe "Static Pages" do

  subject { page }

  describe "Home page" do

    before do
      sign_out_user
      visit root_path
    end

    it { should have_selector("div#extra") }
    it { should have_selector("div#footer") }

    it { should have_selector('title', text: full_title('')) }
    it { should_not have_selector('title', text: '| Home') }
    it { should have_selector('a#call_to_action') }

    describe "for non-signed-in users" do
      it { should have_link("Sign in") }
      it { should have_link("Create Account") }
    end

    it "Call to action should redirect to sign-in page" do
      click_link("call_to_action")
      page.should have_selector 'h1', text: 'Sign Up'
    end

    describe "for signed-in users" do
      let(:user) { FactoryGirl.create(:user) }

      before do
        sign_in user
        visit root_path
      end

      it { should have_selector("li#fat-menu") }

      describe "Display User's feed on main page when that User logs in." do

      end
    end

  end

  describe "Lessons page" do
    before { visit lessons_path }

    it { should have_selector('h3', text: 'Browse By:') }
    it { should have_selector('title', text: full_title('All Lessons')) }
  end

  describe "Labs page" do
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

    click_link "Lessons"
    page.should have_selector 'title', text: full_title("All Lessons")

    click_link "Labs"
    page.should have_selector 'title', text: full_title("Labs")

    click_link "About"
    page.should have_selector 'title', text: full_title('About')

  end

end
