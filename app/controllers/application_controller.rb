class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper

  before_filter :generate_quote

  def generate_quote
    @quote = Quote.first(:offset => rand(Quote.count))
  end
end
