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


  after_initialize :init_subscription
  serialize :completed_challenges
  attr_protected :completed_challenges

  attr_accessible :lesson_id, :user_id

  belongs_to :user
  belongs_to :lesson

  validates :lesson_id, presence: true
  validates :user_id, presence: true

  def complete_challenge(challenge_num)
    completed_challenges << challenge_num unless self.completed_challenges.include? challenge_num
  end

  def last_challenge

  end

  private

    def init_subscription
      self.completed_challenges = []
    end

end
