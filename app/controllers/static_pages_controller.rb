
class StaticPagesController < ApplicationController
  before_filter :generate_quote

  def home
  end

  def help
  end

  def about
  end

  def privacy
  end

  def terms
  end

  def labs
  end

  private

  def generate_quote
    default_quote = "Tell me and I forget, teach me and I may remember, involve me and I learn"
    default_author = "Benjamin Franklin"
    @quote = Quote.first(:offset => rand(Quote.count)) || Quote.create!(quote: default_quote, author: default_author)
  end
end
