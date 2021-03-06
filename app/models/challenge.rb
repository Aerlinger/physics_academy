class Challenge < ActiveRecord::Base

  attr_accessible :description, :hint, :title, :content

  belongs_to :lesson
  validates_presence_of :title
  validates_presence_of :content

  def to_param
    self.title
  end

end
