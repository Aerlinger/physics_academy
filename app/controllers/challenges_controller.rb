class ChallengesController < ApplicationController
  def show
    @lesson = Lesson.find(params[:lesson_id])
    @challenge = Challenge.find(params[:id])
  end
end