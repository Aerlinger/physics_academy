require 'spec_helper'

describe "Static Pages" do

  subject { page }

  describe "Home page" do
    # Make sure we're on the homepage
    before { visit root_path }

    it { should have_selector('h1', text: 'Physics Academy') }
    it { should have_selector('title', text: full_title('')) }
    it { should_not have_selector('title', text: '| Home') }

    describe "for signed-in users" do
      let(:user) { FactoryGirl.create(:user) }

      before do
        sign_in user
        visit root_path
      end

      describe "should display the user's feed" do
        pending "Display User's feed on main page when that User logs in."
      end
    end

  end

  describe "Lessons page" do
    before { visit lessons_path }

    it { should have_selector('h1', text: 'Lessons') }
    it { should have_selector('title', text: full_title('All Lessons')) }
  end

  describe "Labs page" do
    before { visit labs_path }

    it { should have_selector('h1', text: 'Labs') }
    it { should have_selector('title', text: full_title('Labs')) }
  end

  describe "Help page" do
    before { visit help_path }

    it { should have_selector('h1', text: 'Help') }
    it { should have_selector('title', text: full_title('Help')) }
    pending "Should render text body"
  end

  describe "About page" do
    before { visit about_path }

    it { should have_selector('h1', text: 'About') }
    it { should have_selector('title', text: full_title('About')) }
    pending "Should render text body"
  end

  describe "Terms page" do
    before { visit terms_path }

    it { should have_selector('h1', text: 'Terms') }
    it { should have_selector('title', text: full_title('Terms')) }
    pending "Should render text body"
  end

  describe "Privacy page" do
    before { visit privacy_path }

    it { should have_selector('h1', text: 'Privacy') }
    it { should have_selector('title', text: full_title('Privacy Policy')) }
    pending "Should render text body"
  end

  it "should have the right links on the layout" do
    visit root_path

    click_link "Sign in"
    page.should have_selector 'title', text: full_title('Sign in')

    click_link "Lessons"
    page.should have_selector 'title', text: full_title("All Lessons")

    click_link "Labs"
    page.should have_selector 'title', text: full_title("Labs")

    click_link "About"
    page.should have_selector 'title', text: full_title('About')

    click_link "Help"
    page.should have_selector 'title', text: full_title('Help')

    click_link "Terms"
    page.should have_selector 'title', text: full_title('Terms')

    click_link "Privacy Policy"
    page.should have_selector 'title', text: full_title('Privacy Policy')

    click_link "Physics Academy"
    page.should have_selector 'h1', text: 'Physics Academy'

    click_link "Sign up now!"
    page.should have_selector 'title', text: full_title('Sign up')
  end

end
