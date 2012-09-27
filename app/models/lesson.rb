# == Schema Information
#
# Table name: lessons_content
#
#  id          :integer         not null, primary key
#  title       :string(255)
#  description :string(255)
#  created_at  :datetime        not null
#  updated_at  :datetime        not null
#

class Lesson < ActiveRecord::Base

  attr_accessible :title, :description, :image_url, :difficulty

  validates_presence_of :description
  validates_presence_of :title

  has_many :subscriptions
  has_many :users, through: :subscriptions

  has_many :tasks, dependent: :destroy


  # Returns the index of this lesson in the Lessons.all array
  def index
    Lesson.all.find_index(self)+1
  end

  def to_param
    "#{id}-#{title.parameterize}"
  end

  def first_task
    tasks.first
  end

  def last_task
    tasks.last
  end


  scope :newest, :order => 'created_at DESC'

end
