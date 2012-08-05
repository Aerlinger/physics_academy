class Quote < ActiveRecord::Base

  attr_accessible :quote, :author

  before_save :validate_quote

  validates_presence_of :quote, length: {maximum: 200}

  scope :rand_quote, lambda { first(:offset => rand(Quote.count)) }


  private

    def validate_quote

      # Make sure there is a period at the end of the quote
      self.quote << '.' unless self.quote.last == '.'

      # Regular expression to add quotes to a string if they aren't present'
      self.quote = %Q/"#{self.quote.gsub(/\A['"]+|['"]+\Z/, "")}"/

    end

end
