require 'spec_helper'

describe "Challenges" do

  subject { page }

  before do
    visit root_path
    click_link 'Lessons'
    click_link "lesson_#{1}_start"
  end

  describe "Should navigate to first lessons" do

  end

end