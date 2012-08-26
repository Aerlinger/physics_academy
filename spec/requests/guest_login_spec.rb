require 'spec_helper'

describe "Guest user navigaton" do

  subject { page }


  describe "Visit Lessons" do

    before do
      sign_out_user
      visit root_path
    end

    describe "Should have right login links in header" do
      it { should have_default_login_links }
    end

  end

end