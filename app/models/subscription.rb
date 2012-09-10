# A Subscription manages the completion status for each lesson through a user
# A user has_many lessons through subscriptions. Conversely, a lesson has_many users through subscriptions.
#
class Subscription < ActiveRecord::Base

  # Ensure completed challenges array is empty on initialization
  after_create :create_empty_subscription

  # lesson_id and user_id are the ids for the lesson and user this subscription references
  attr_accessible :user_id, :lesson_id
  attr_reader :current_challenge_id, :last_completed_challenge_id

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
  def complete_challenge

    # Only add a completed_challenge index to the completed challenges array if it does not yet exist.
    if completed_challenges.include? @current_challenge_id
      logger.info( "\t #{@current_challenge_id} \tLesson: #{:lesson_id} \tUser: #{user.name} has already been completed" )
      return 0
    else
      # Add the completed lesson id
      self.completed_challenges << @current_challenge_id

      # Add the completed points to this subscription
      self.points = points + Challenge.find_by_id(@current_challenge_id).points

      # We should always keep track of which challenge in this subscription was completed most recently.
      @last_completed_challenge_id = @current_challenge_id
      @current_challenge_id = next_challenge_id
      self.save!

      # Log the completion
      logger.info( "COMPLETED: Challenge #{@current_challenge_id}" )
      self.points
    end

  end

  def current_challenge_id=(challenge_id)

    if (challenge_id.is_a? String) && challenge_id.match(/^\d+$/)
      challenge_id = challenge_id.to_i
    elsif !challenge_id.is_a? Integer
      raise(ArgumentError, "challenge_id should be an integer pertaining to the id of the completed challenge")
    end

    @current_challenge_id = challenge_id
  end

  # Returns true if completed challenges isn't empty
  def reset
    num_removed = completed_challenges.size
    self.completed_challenges = []

    self.current_challenge_id=(lesson.challenges.first.id)
    @last_completed_challenge_id = 0
    self.points = 0
    self.save!

    num_removed
  end

  # Resets the specified and sets the current_challenge to the last_completed_challenge
  # Returns false if no challenge to be reset is found
  def reset_challenge

    removed_challenge_id = completed_challenges.delete(@current_challenge_id)

    if !removed_challenge_id.blank?

      # deduct the points and mark the last lesson
      self.points = points - lesson.challenges.find(removed_challenge_id).points

      self.save!
      logger.info( "RESET Challenge: #{@current_challenge_id} \tLesson: #{lesson.id} \tUser: #{self.user.name}" )

      true
    end

    false
  end

  # Returns the id of the next non-completed challenge. If all challenges have been completed returns :lesson_finished.
  #  This method should not modify any internals of self.
  def next_challenge_id

    # If the non_completed_challenges array is empty, we're done.
    if non_completed_challenge_ids.empty?
      :lesson_finished

    # Else, if the user is completing the last lesson, return them to the first lesson they skipped and didn't complete
    elsif @current_challenge_id == lesson.challenges.last.id
      non_completed_challenge_ids.min

    # Otherwise, just go on to the next lesson
    else
      @current_challenge_id + 1
    end

  end

  # Returns an array of challenge_ids that have not yet been completed (complementary set of completed_challenges).
  def non_completed_challenge_ids

    # Define a range over the first challenge to the last challenge
    challenges = lesson.challenges
    lesson_challenge_ids = (challenges.first.id..challenges.last.id).to_a

    # Non completed challenges are the difference between all challenge id's and the completed challenges
    return lesson_challenge_ids - completed_challenges
  end

  # returns true if the specified challenge has been completed
  def completed_challenge_id?(challenge_id)
    completed_challenges.include? challenge_id
  end

  private

    def create_empty_subscription
      self.completed_challenges ||= []
      @last_completed_challenge_id = nil
      @current_challenge_id = lesson.challenges.first.id
    end


end
