class User < ActiveRecord::Base

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  attr_accessible :email, :password, :password_confirmation, :num_completed_lessons, :num_points, :num_achievements, :remember_me
  # As long as there is a password_digest column in the database, adding this one method to our model gives a secure way to create and authenticate new users
  attr_protected :admin

  # Flag if this is an unpersisted (guest) user
  attr_accessor :guest
  attr_protected :guest

  before_save :create_remember_token
  before_save :init_name_and_email

  has_many :subscriptions, dependent: :destroy
  has_many :lessons, through: :subscriptions

  validates :email, format: { with: ApplicationHelper::VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }
  validates :name, length: { maximum: 50 }
  validates_presence_of :password_confirmation

  def voted_for?(lesson)
    evaluations.where(target_type: lesson.class, target_id: lesson.id).present?
  end

  def subscribed_to?(lesson)
    !subscriptions.find_by_lesson_id(lesson.id).blank?
  end

  def progress_for_lesson(lesson)
    subscription = subscriptions.find_by_lesson_id(lesson.id)
    subscription.blank? ? 0 : subscription.percent_progress
  end

  def update_with_password(params={})
    if params[:password].blank?
      params.delete(:password)
      params.delete(:password_confirmation) if params[:password_confirmation].blank?
    end
    update_attributes(params)
  end

  scope :guests, where(name: "GUEST")

  private

    def init_name_and_email
      self.lazy_id ||= -1

      self.email = email.downcase
      self.name = "Anonymous User" if name.blank?
      self.name.try(:titleize)
    end

    def create_remember_token
      self.remember_token = SecureRandom.urlsafe_base64
    end

end