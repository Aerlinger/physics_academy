require 'spec_helper'

describe "Admin Pages" do

  subject { page }

  let(:admin) { FactoryGirl.create(:admin) }

  before do
    visit root_path

    sign_in admin
    admin.update_attribute :admin, true
  end

  describe "Should have dashboard link in header" do
    it { should have_link "Dashboard" }
  end


end