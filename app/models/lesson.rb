# == Schema Information
#
# Table name: lessons
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

  has_many :challenges, dependent: :destroy

  has_reputation :votes, source: :user, aggregated_by: :sum

end
