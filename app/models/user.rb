class User < ActiveRecord::Base

  attr_accessible :name, :email, :password, :password_confirmation, :num_completed_lessons, :num_points, :num_achievements
  # As long as there is a password_digest column in the database, adding this one method to our model gives a secure way to create and authenticate new users
  attr_protected :admin
  has_secure_password


  has_many :evaluations, class_name: "RSEvaluation", as: :source
  has_reputation :votes, source: {reputation: :votes, of: :lessons_content}, aggregated_by: :sum

  before_save { |user| user.email = user.email.downcase }
  before_save :create_remember_token

  has_many :subscriptions, dependent: :destroy
  has_many :lessons, through: :subscriptions

  # Standard email regular expression
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :name, presence: true , length: { maximum: 50, minimum: 2 }
  validates :email, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }
  validates :password_confirmation, presence: true

  def voted_for?(lesson)
    evaluations.where(target_type: lesson.class, target_id: lesson.id).present?
  end

  def subscribe(lesson)
    subscriptions.find_or_create_by_lesson_id(user_id: self.id, lesson_id: lesson.id)
  end

  def subscribed_to?(lesson)
    !subscriptions.find_by_lesson_id(lesson.id).blank?
  end

  def progress_for_lesson(lesson)
    subscription = subscriptions.find_by_lesson_id(lesson.id)
    subscription.blank? ? 0 : subscription.percent_progress
  end

  private

    def create_remember_token
      self.remember_token = SecureRandom.urlsafe_base64
    end

end

# == Schema Information
#
# Table name: users
#
#  id                    :integer         not null, primary key
#  name                  :string(255)
#  email                 :string(255)
#  num_completed_lessons :integer
#  num_points            :integer
#  num_achievements      :integer
#  created_at            :datetime        not null
#  updated_at            :datetime        not null
#  password_digest       :string(255)
#  remember_token        :string(255)
#

