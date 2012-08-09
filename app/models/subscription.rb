# == Schema Information
#
# Table name: subscriptions
#
#  id         :integer         not null, primary key
#  user_id    :integer
#  lesson_id  :integer
#  created_at :datetime        not null
#  updated_at :datetime        not null
#

class Subscription < ActiveRecord::Base


  # Ensure completed challenges array is empty on initialization
  after_initialize :create_empty_subscription

  serialize :completed_challenges
  attr_protected :completed_challenges

  attr_accessible :lesson_id, :user_id

  belongs_to :user
  belongs_to :lesson

  validates :lesson_id, presence: true
  validates :user_id, presence: true

  def complete_challenge(challenge_id)

    # Only add a completed_challenge index to the completed challenges array if it does not yet exist.
    already_included = completed_challenges.include? challenge_id

    unless already_included

      # Add the completed lesson id, and keep the list sorted
      completed_challenges << challenge_id unless already_included
      completed_challenges.sort!

      self.points = points + lesson.challenges.find_by_id(challenge_id).points

      # Log the completion
      logger.info( "COMPLETE: Challenge #{challenge_id} \tLesson: #{:lesson_id} \tUser: #{self.user.name}" )

      # We should always keep track of which challenge in this subscription was completed most recently.
      self.last_completed_challenge = challenge_id
    else
      logger.info( "\t #{challenge_id} \tLesson: #{:lesson_id} \tUser: #{self.user.name} has already been completed" )
    end

    !already_included

  end

  def first_challenge
    lesson.challenges.first.id
  end

  # Returns true if completed challenges isn't empty
  def reset
    num_removed = completed_challenges.size
    self.completed_challenges = []

    touch_challenge( first_challenge )
    self.last_completed_challenge = 0
    self.points = 0;

    num_removed
  end

  # returns false if no challenge to be deleted is found
  def reset_challenge(challenge_id)
    removed_challenge = completed_challenges.delete(challenge_id)

    success = !removed_challenge.blank?

    if success
      # Log the reset
      logger.info( "RESET Challenge: #{challenge_id} \tLesson: #{lesson.id} \tUser: #{self.user.name}" ) if success

      self.points = points - removed_challenge.points
      touch_challenge(lesson.challenges.first.id)
      # There should never be a duplicate completed challenge in the completed challenges array
    end

    success
  end

  def touch_challenge(challenge_id)
    self.last_attempted_challenge = challenge_id
  end

  def next_challenge_id
    # if We're not on the last challenge
    if last_completed_challenge != lesson.challenges.last.id
      return last_completed_challenge+1
    else
      return last_completed_challenge
    end
  end

  # returns true if the specified challenge has been completed
  def completed_challenge?(challenge)
    completed_challenges.include? challenge.id
  end

  def percent_progress
    completed_challenges.size / lesson.challenges.size * 100
  end


  private

    def create_empty_subscription
      self.completed_challenges ||= []
    end


end
