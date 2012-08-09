class ChallengesController < ApplicationController

  before_filter :read_params
  after_filter :update, only: [:reset, :reset_all, :submit]  # Only executed on PUT requests

  def show

    @subscription.touch_challenge(params[:id])

    respond_to do |format|
      format.js
      format.html
    end

  end

  def index
    redirect_to lesson_challenge_path(lesson_id: @lesson.id, id: 1)
  end

  # PUT
  def submit

    if @subscription.blank?
      @user.subscriptions.create!(user_id: @user.id, lesson_id: @lesson.id)
    end

    if @subscription.complete_challenge(@challenge.id)
      respond_to do |format|
        format.js
      end
    else

    end

  end

  # PUT
  def reset
    respond_to do |format|
      format.js
    end
  end

  # PUT
  def reset_all
    respond_to do |format|
      format.js
    end
  end

  # PUT
  def update
    @subscription.save!
    #render partial: "update"
  end

  def next
    redirect_to lesson_challenge_path(lesson_id: @lesson.id, id: @subscription.next_challenge_id)

    # For an AJAX request:
    #respond_to do |format|
    #  format.js
    #end
  end

  def error
    respond_to do |format|
      format.js
    end
  end

  def warning
    respond_to do |format|
      format.js
    end
  end

  private


    def read_params
      @user = current_user
      @lesson = Lesson.find(params[:lesson_id])
      @challenge = Challenge.find(params[:id]) if params[:id]
      @subscription = current_user.subscribe(@lesson)
    end


end