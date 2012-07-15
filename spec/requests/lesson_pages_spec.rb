require 'spec_helper'

describe "LessonPages" do

  subject { page }

  let(:lesson) { FactoryGirl.create(:lesson) }

  before { visit lessons_path }

  it "should display each lesson" do
    Lesson.all.each do |lesson|
      page.should have_selector('h2', lesson.title)
      page.should have_selector('p', lesson.description)
    end
  end

end
