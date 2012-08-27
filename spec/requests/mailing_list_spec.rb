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
    end

  end

  describe "user enters invalid email" do
    before do
      fill_in "subscribe_email", with: invalid_email1
      click_button "Subscribe"
    end

    it "should not add user" do
      MailingList.find_by_email(invalid_email1).should be_nil
    end
  end

end