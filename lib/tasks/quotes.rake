namespace :db do
  desc "Populate database with quotes"
  task quotes: :environment do
    Quote.delete_all
    make_quotes
  end
end


def quote_definitions
  [
    {quote: "Tell me and I forget, teach me and I may remember, involve me and I learn.", author: "Benjamin Franklin"},
    {quote: "The Sun, with all the planets revolving around it, and depending on it, can still ripen a vine of grapes as though it had nothing else in the Universe to do", author: "Galileo"},
    {quote: "You cannot teach a man anything; you can only help him discover it in himself.", author: "Galileo"},
    {quote: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin"},
    {quote: "You cannot teach a man anything; you can only help him discover it in himself.", author: "Galileo"},
    {quote: "All truths are easy to understand once they are discovered; the point is to discover them.", author: "Galileo", author: "Leonardo da Vinci"},
    {quote: "Learning never exhausts the mind.", author: "Leonardo da Vinci"},
  {quote: "Education is the kindling of a flame, not the filling of a vessel.", author: "Socrates"},
  {quote: "When you make the finding yourself - even if you're the last person on Earth to see the light - you'll never forget it.", author: "Carl Sagan"},
  {quote: "Never regard your study as a duty, but as the enviable opportunity to learn to know the
   liberating influence of beauty in the realm of the spirit for your own personal job and to the profit of the community to which your later work belongs.", author: "Einstein"},
  {quote: "He who has imagination without learning has wings and no feet.", author: "Joseph Joubert"},
  {quote: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.", author: "Abigail Adams"},
  {quote: "He who has imagination without learning has wings and no feet.", author: "Joseph Joubert"},
  {quote: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.", author: "Abigail Adams"}
  ]
end

def make_quotes

  quote_refs = quote_definitions

  quote_refs.each do |quote_ref|
    new_quote = Quote.new
    new_quote.quote = quote_ref[:quote]
    new_quote.author = quote_ref[:author] || "anonymous"
    new_quote.save!
  end


  #Quote.create!(quote: "The aim of science is not to open the door to everlasting wisdom but to set a limit on everlasting error.", author: "Bertolt Brecht")
  #Quote.create!(quote: "Errors are not in the art but in the artificers.", author: "Sir Issac Newton")

  #Quote.create!(quote: "The Sun, with all the planets revolving around it, and depending on it, can still ripen a vine of grapes as though it had nothing else in the Universe to do", author: "Galileo")

  #Quote.create!(quote: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin")

  #Quote.create!(quote: "You cannot teach a man anything; you can only help him discover it in himself.", author: "Galileo")

  #Quote.create!(quote: "There is something fascinating about science.
  #                      One gets such wholesale returns of conjecture
  #                      out of such a trifling investment of fact.",
  #              author: "Mark Twain", source: "Life on the Mississippi", date: 1883)

  #Quote.create!(quote: "In rivers, the water that you touch is the last of what has
  #                      passed and the first of that which comes;
  #                      so with present time.", author: "Leonardo da Vinci")

  #Quote.create!(quote: "All truths are easy to understand once they are discovered; the point is to discover them.", author: "Galileo", author: "Leonardo da Vinci")

  #Quote.create!(quote: "Learning never exhausts the mind.", author: "Leonardo da Vinci")

  #Quote.create!(quote: "I do not feel obliged to believe that the same God who has endowed us with sense, reason,
  #                      and intellect has intended us to forgo their use.", author: "Galileo")

  #Quote.create!(quote: "It is not that I'm so smart. But I stay with the questions much longer.", author: "Albert Einstein")

  #Quote.create!(quote: "Education is the kindling of a flame, not the filling of a vessel.", author: "Socrates")

  #Quote.create!(quote: "When you make the finding yourself - even if you're the last person on Earth to see the light - you'll never forget it.", author: "Carl Sagan")

  #Quote.create!(quote: "Never regard your study as a duty, but as the enviable opportunity to learn to know the liberating influence of beauty in the realm of the spirit for your own personal job and to the profit of the community to which your later work belongs.", author: "Einstein")

  #Quote.create!(quote: "He who has imagination without learning has wings and no feet.", author: "Joseph Joubert")

  #Quote.create!(quote: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.", author: "Abigail Adams")
end