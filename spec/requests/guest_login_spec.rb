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

    describe "After visiting a lesson" do

      before do
        visit root_path
        click_link 'Lessons'
        click_link "lesson_#{1}_start"
      end

      it { should have_guest_login_links }


      pending "After destroying session do" do

      end

      describe "after logging in" do
        before(:suite) do
          guest = User.new(name: "user_from_guest", email: "userfromguest@test.com",
                           password: "testpass", password_confirmation: "testpass")
          sign_in(guest)
        end

        it { should_not have_guest_login_links }
        it { should show_user_in_header }

        describe "log out user" do
          before { sign_out_user }

          it { should_not show_user_in_header }
          it { should have_default_login_links }
        end
      end

    end

  end

end