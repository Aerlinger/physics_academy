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
  attr_accessible :lesson_id, :user_id
  belongs_to :user
  belongs_to :lesson

  validates :lesson_id, presence: true
  validates :user_id, presence: true
end
