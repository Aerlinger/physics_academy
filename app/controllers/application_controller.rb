class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper

  before_filter :generate_quote

  def generate_quote
    @quote = Quote.first(:offset => rand(Quote.count)) || Quote.create!(quote: "Tell me and I forget, teach me and I may remember, involve me and I learn", author: "Benjamin Franklin")
  end
end
