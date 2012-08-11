# A Subscription manages the completion status for each lesson through a user
# A user has_many lessons through subscriptions. Conversely, a lesson has_many users through subscriptions.
#
class Subscription < ActiveRecord::Base

  # Ensure completed challenges array is empty on initialization
  after_initialize :create_empty_subscription

  # lesson_id and user_id are the ids for the lesson and user this subscription references
  attr_accessible :user_id, :lesson_id

  belongs_to :user
  belongs_to :lesson

  # Subscription must have both a user and a lesson
  validates :user_id, presence: true
  validates :lesson_id, presence: true

  # completed_challenges is an array of integers containing the id's of completed lessons
  serialize :completed_challenges

  # :current_challenge_id also includes whatever challenge the user is currently completing
  attr_protected :completed_challenges, :points, :current_challenge_id, :last_completed_challenge_id

  # Action performed every time a user successfully completes a task.
  #  complete action does the following:
  #   1. Adds the completed challenge to the completed_challenges array only if that challenge has not yet been completed.
  #   2. Sorts the array in ascending order
  #   3. Adds the points of the completed lesson to this subscription
  #   4. Stores the completed challenge as the last completed challenge
  #   5. Saves the subscription record
  def complete_challenge(challenge_id)

    # Only add a completed_challenge index to the completed challenges array if it does not yet exist.
    already_included = completed_challenges.include? challenge_id

    unless already_included

      # Add the completed lesson id, and keep the list sorted
      self.completed_challenges << challenge_id
      self.completed_challenges.sort!

      # Add the completed points to this subscription
      self.points = points + Challenge.find_by_id(challenge_id).points

      # Log the completion
      logger.info( "COMPLETE: Challenge #{challenge_id}" )

      # We should always keep track of which challenge in this subscription was completed most recently.
      self.last_completed_challenge_id = challenge_id

    else
      logger.info( "\t #{challenge_id} \tLesson: #{:lesson_id} \tUser: #{self.user.name} has already been completed" )
    end

    !already_included

  end

  # Returns true if completed challenges isn't empty
  def reset
    num_removed = completed_challenges.size
    self.completed_challenges = []

    touch_challenge( first_challenge )
    self.last_completed_challenge_id = 0
    self.points = 0;

    num_removed
  end

  # Resets the specified challenge to a non-completed state and sets the current_challenge to the last_completed_challenge
  # Returns false if no challenge to be reset is found
  def reset_challenge(challenge_id)
    removed_challenge = completed_challenges.delete(challenge_id)

    success = !removed_challenge.blank?

    if success
      # Log the reset
      logger.info( "RESET Challenge: #{challenge_id} \tLesson: #{lesson.id} \tUser: #{self.user.name}" ) if success

      self.points = points - removed_challenge.points
      touch_challenge(:last_completed_challenge_id)
      # There should never be a duplicate completed challenge in the completed challenges array
    end

    success
  end

  def next_challenge_id
    # if We're not on the last challenge
    if current_challenge_id != lesson.challenges.last.id
      return completed_challenges.last+1
    else
      return current_challenge_id
    end
  end

  def first_challenge
    lesson.challenges.first.id
  end

  def touch_challenge(challenge_id)
    self.current_challenge_id = challenge_id
  end

  # returns true if the specified challenge has been completed
  def completed_challenge?(challenge)
    completed_challenges.include? challenge.id
  end

  def percent_progress
    completed_challenges.size / lesson.challenges.size * 100
  end

  private

    def current_challenge
      lesson.challenges.find_by_id(current_challenge_id)
    end

    def create_empty_subscription
      self.completed_challenges ||= []
    end


end
