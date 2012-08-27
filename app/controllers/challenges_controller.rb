class ChallengesController < ApplicationController

  before_filter :read_params, except: [:index]
  after_filter :save_subscription, only: [:reset, :reset_all, :submit, :show]  # Only executed on PUT requests

  def show

    @subscription.touch_challenge(params[:id])

    respond_to do |format|
      format.js
      format.html
    end

  end

  def index
    redirect_to lesson_challenge_path(lesson_id: @lesson.id, id: @lesson.challenges.first.id)
  end

  # PUT
  def submit

    # Submit process

    # Validate submission and get response. Three possibilities: :success, :error, or :warning
    #
    #  On success:
    #    Mark lesson as completed and advance to next lessons
    #    Save subscription
    #  On warning or error:
    #    Display relevant message and do not advance lesson

    respond_to do |format|
      format.js
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

  def next
    redirect_to lesson_challenge_path(lesson_id: @lesson.id, id: @subscription.next_challenge_id)
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

    # PUT
    def save_subscription
      if !@user.guest
        @subscription.save!
      end
    end

    def read_params
      @user = current_or_guest_user!
      @lesson = Lesson.find(params[:lesson_id])
      @challenge = Challenge.find(params[:id])
      @subscription = Subscription.find_or_create_by_user_id_and_lesson_id(user_id: @user.id, lesson_id: @lesson.id)
    end


end