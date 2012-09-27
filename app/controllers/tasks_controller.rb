class TasksController < ApplicationController

  before_filter :read_params, except: [:index]
  after_filter :save_subscription, only: [:reset, :reset_all, :submit] # Only executed on PUT requests


  def show

    @subscription.set_current_task_id=(params[:id])

    respond_to do |format|
      format.js
      format.html
    end

  end

  def index
    redirect_to lesson_task_path(lesson_id: @lesson.id, id: @lesson.tasks.first.id)
  end

  # PUT
  def submit

    respond_to do |format|
      format.js
    end
  end


  def success

    #  On success:
    #    Save subscription
    #    Mark lesson as completed and advance to next lessons

    @subscription.complete_task
    redirect_to lesson_task_url(lesson_id: @lesson.id, id: @subscription.next_task_id)
  end

  # PUT
  def reset
    @subscription.reset_task
    redirect_to lesson_task_url(lesson_id: @lesson.id, id: @subscription.current_task_id)
  end

  # PUT
  def reset_all
    @subscription.reset
    redirect_to lesson_task_url(lesson_id: @lesson.id, id: @subscription.current_task_id)
  end


  private


  # PUT
  def save_subscription
    @subscription.save!
  end

  def read_params
    @user = current_or_guest_user!
    @lesson = Lesson.find(params[:lesson_id])
    @task = Task.find(params[:id])
    @subscription = Subscription.find_or_create_by_user_id_and_lesson_id(user_id: @user.id, lesson_id: @lesson.id)
  end


end