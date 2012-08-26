require 'spec_helper'

describe "Mailing List" do

  subject { page }

  let(:valid_email) { "anthony@rspec.com" }
  let(:invalid_email1) { "blah@h" }
  let(:invalid_email2) { "invalid@invalid" }
  let(:invalid_email3) { "[]@invalid.com" }

  before do
    visit root_path
  end

  describe "User clicks subscribe link" do
    before do
      fill_in "subscribe_email", with: valid_email
    end

    it "should add the right email to the mailing list" do
      expect { click_button "Subscribe" }.to change { MailingList.all.size }.by 1
      #MailingList.all.should include( MailingList.find_by_email(valid_email) )
    end

    it "should show correct"
  end

  describe "user enters invalid email" do
    before do
      fill_in "subscribe_email", with: invalid_email1
      click_button "Subscribe"
    end

    it "should display error message" do
      page.should have_selector('#subscribe_message', text: "That email address is invalid or is already on the emailing list")
    end

    it "should raise error" do

    end

    it "should not add user" do
      MailingList.find_by_email(invalid_email1).should be_nil
    end
  end

end