# A Subscription manages the completion status for each lesson through a user
# A user has_many lessons through subscriptions. Conversely, a lesson has_many users through subscriptions.
#
class Subscription < ActiveRecord::Base

  # Ensure completed tasks array is empty on initialization
  after_create :create_empty_subscription

  # lesson_id and user_id are the ids for the lesson and user this subscription references
  attr_accessible :user_id, :lesson_id, :current_task_id
  attr_reader :last_completed_task_id

  belongs_to :user
  belongs_to :lesson

  # Subscription must have both a user and a lesson
  validates :user_id, presence: true
  validates :lesson_id, presence: true

  # completed_tasks is an array of integers containing the id's of completed lessons
  serialize :completed_tasks

  # :current_task_id also includes whatever task the user is currently completing
  attr_protected :completed_tasks, :points, :current_task_id, :last_completed_task_id

  # Action performed every time a user successfully completes a task.
  #  complete action does the following:
  #   1. Adds the completed task to the completed_tasks array only if that task has not yet been completed.
  #   2. Sorts the array in ascending order
  #   3. Adds the points of the completed lesson to this subscription
  #   4. Stores the completed task as the last completed task
  #   5. Saves the subscription record
  def complete_task

    # Only add a completed_task index to the completed task array if it does not yet exist.
    if completed_tasks.include? current_task_id
      logger.info( "\t #{current_task_id} \tLesson: #{:lesson_id} \tUser: #{user.name} has already been completed" )
      return 0
    else
      # Add the completed lesson id
      self.completed_tasks << current_task_id

      # Add the completed points to this subscription
      self.points = points + Task.find_by_id(current_task_id).points

      # We should always keep track of which task in this subscription was completed most recently.
      @last_completed_task_id = current_task_id
      current_task_id = next_task_id
      self.save!

      # Log the completion
      logger.info( "COMPLETED: Task #{current_task_id}" )
      self.points
    end

  end

  def set_current_task_id=(task_id)

    if (task_id.is_a? String) && task_id.match(/^\d+$/)
      task_id = task_id.to_i
    elsif !task_id.is_a? Integer
      raise(ArgumentError, "task_id should be an integer pertaining to the id of the completed task")
    end

    update_attribute(:current_task_id, task_id)
  end

  # Returns true if completed_tasks isn't empty
  def reset
    num_removed = completed_tasks.size
    self.completed_tasks = []

    self.set_current_task_id=(lesson.tasks.first.id)
    @last_completed_task_id = 0
    self.points = 0

    num_removed
  end

  # Resets the specified and sets the current_task to the last_completed_task
  # Returns false if no task to be reset is found
  def reset_task

    removed_task_id = completed_tasks.delete(current_task_id)

    if !removed_task_id.blank?

      # deduct the points and mark the last lesson
      self.points = points - lesson.tasks.find(removed_task_id).points

      self.save!
      logger.info( "RESET task: #{current_task_id} \tLesson: #{lesson.id} \tUser: #{self.user.name}" )

      true
    end

    false
  end

  # Returns the id of the next non-completed task. If all tasks have been completed returns :lesson_finished.
  #  This method should not modify any internals of self.
  def next_task_id

    # If the non_completed_tasks array is empty, we're done.
    if non_completed_task_ids.empty?
      :lesson_finished

    # Else, if the user is completing the last lesson, return them to the first lesson they skipped and didn't complete
    elsif current_task_id == lesson.tasks.last.id
      non_completed_task_ids.min

    # Otherwise, just go on to the next lesson
    else
      current_task_id + 1
    end

  end

  # Returns an array of task_ids that have not yet been completed (complementary set of completed_tasks).
  def non_completed_task_ids

    # Define a range over the first task to the last task
    tasks = lesson.tasks
    first_task = tasks.first.id
    last_task = tasks.last.id
    lesson_task_ids = (first_task..last_task).to_a

    # Non completed tasks are the difference between all task id's and the completed tasks
    return lesson_task_ids - completed_tasks
  end

  # returns true if the specified task has been completed
  def completed_task_id?(task_id)
    completed_tasks.include? task_id
  end

  private

    def create_empty_subscription
      self.completed_tasks ||= []
      @last_completed_task_id = nil
    end


end
