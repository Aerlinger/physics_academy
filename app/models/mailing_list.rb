class MailingList < ActiveRecord::Base
  attr_accessible :email

  validates_uniqueness_of :email, { case_sensitive: false }
  validates :email, format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }
end
