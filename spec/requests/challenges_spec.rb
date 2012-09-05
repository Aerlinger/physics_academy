require 'spec_helper'

describe "Challenges" do

  subject { page }

  describe "should display each challenge" do
    Lesson.all.each do |lesson|
      Challenge.all.each do |challenge|

        #visit lesson_challenge_path(lesson, challenge)

        #it {should have_selector "challenge_nav"}

      end
    end
  end

end