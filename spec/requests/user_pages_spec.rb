require 'spec_helper'

describe "Static Pages" do

  subject { page }

  let(:user) { FactoryGirl.create(:user) }

  before(:all) { 30.times { FactoryGirl.create(:user) } }
  after(:all)  { User.delete_all }

  before(:each) do
    sign_in user
  end

  describe "Visit profile" do
    before { click_link "Profile" }
    it { should_not have_error_message }
  end

  describe "Visit settings" do
    before { click_link "Settings" }

    it { should show_user_in_header}
    it { have_selector('title', text: full_title('Edit Profile')) }
  end

end