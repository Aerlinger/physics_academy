class Task < ActiveRecord::Base

  attr_accessible :description, :hint, :title, :content

  belongs_to :lesson
  validates_presence_of :title
  validates_presence_of :content

  def index
    lesson.tasks.find_index(self)+1
  end

  def to_param
    "#{id}-#{title.parameterize}"
  end

end
