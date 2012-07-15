class LessonsController < ApplicationController

  def index
    @lessons = Lesson.all

    respond_to do |format|
      format.html
      format.json { render json: @lessons }
    end
  end

  def show
    @lesson = Lesson.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @lesson }
    end
  end

  def vote
    value = params[:type] == "up" ? 1 : -1
    @lesson = Lesson.find(params[:id])
    @lesson.add_or_update_evaluation(:votes, value, current_user)
    redirect_to :back, notice: "Thank you for voting"
  end

end