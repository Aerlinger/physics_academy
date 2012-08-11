# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# Create the administrator and sample user
User.delete_all
User.create!(name:     "admin",
                     email:    "admin@physicsacademy.com",
                     password: "physics",
                     password_confirmation: "physics")

User.create!(name:     "Newton",
             email:    "Newton@physicsacademy.com",
             password: "physics",
             password_confirmation: "physics")



## ##########################################
# QUOTE DB POPULATION
## ##########################################
Quote.delete_all

quote_refs =
    [
      {quote: "Tell me and I forget, teach me and I may remember, involve me and I learn.", author: "Benjamin Franklin"},
      {quote: "The Sun, with all the planets revolving around it, and depending on it, can still ripen a vine of grapes as though it had nothing else in the Universe to do", author: "Galileo Galilei"},
      {quote: "You cannot teach a man anything; you can only help him discover it in himself.", author: "Galileo Galilei"},
      {quote: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin"},
      {quote: "You cannot teach a man anything; you can only help him discover it in himself.", author: "Galileo Galilei"},
      {quote: "All truths are easy to understand once they are discovered; the point is to discover them.", author: "Galileo Galilei"},
      {quote: "Learning never exhausts the mind.", author: "Leonardo da Vinci"},
      {quote: "Education is the kindling of a flame, not the filling of a vessel.", author: "Socrates"},
      {quote: "When you make the finding yourself - even if you're the last person on Earth to see the light - you'll never forget it.", author: "Carl Sagan"},
      {quote: "Never regard your study as a duty, but as the enviable opportunity to learn to know the
     liberating influence of beauty in the realm of the spirit for your own personal job and to the profit of the community to which your later work belongs.", author: "Einstein"},
      {quote: "He who has imagination without learning has wings and no feet.", author: "Joseph Joubert"},
      {quote: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.", author: "Abigail Adams"},
      {quote: "Measure what is measurable, and make measurable what is not so.", author: "Galileo Galilei"}
  ]


quote_refs.each do |quote_ref|
  new_quote = Quote.new
  new_quote.quote = quote_ref[:quote]
  puts "\n\t\"#{new_quote.quote}\"\n"
  new_quote.author = quote_ref[:author] || "anonymous"
  new_quote.save!
end

Rake::Task['db:populate_lessons'].execute
Rake::Task['db:populate_circuit_simulations'].execute
