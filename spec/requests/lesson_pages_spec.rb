require 'spec_helper'

describe "Lesson Pages" do

  subject { page }

  let(:lesson) { FactoryGirl.create(:lesson) }

  before { visit lessons_path }

  it "should display each lesson" do
    Lesson.all.each do |lesson|
      page.should have_selector('h2', lesson.title)
      page.should have_selector('p', lesson.description)

      expect { click_link "goto_lesson_#{lesson.id}" }.to redirect_to lesson_challenge_path(
                                                            lesson_id: lesson.id, id: lesson.challenges.first.id)
    end
  end

end
