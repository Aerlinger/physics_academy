# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


#################################################################
# Lesson definitions declared here:
#################################################################
def lesson_definitions

  [
    #################################################################
    # Introduction to Physics
    #################################################################
    {
        title: "Introduction to Physics",
        description: "Completely new to physics? This is where to start.",
        image_url: "introduction_to_physics.jpg",
        challenges: ["What is physics?",
                     "Units and Measurements",
                     "Significant Figures",
                     "Conversion of Units",
                     "Dimensional Analysis",
                     "In Review"],
        under_construction: true,
        subject: "Introductory",
        difficulty: "Beginner"
    },

    #################################################################
    # Newtonian Physics I
    #################################################################
    {
      title: "Newtonian Physics I: The laws of motion",
      description: "Newtonian physics describes the motion and interaction of physical bodies under forces.",
      image_url: "newtonian_physics_ii.jpg",
      under_construction: false,
      difficulty: "Beginner",
      subject: "Newtonian Mechanics",
      challenges: ["<Challenge 1>",
                    "<Challenge 2>",
                    "<Challenge 3>",
                    "<Challenge 4>",
                    "<Challenge 5>",
                    "<Challenge 6>"],
      under_construction: true,
      subject: "Introductory",
      difficulty: "Beginner"
    },

    #################################################################
    # Newtonian Physics II
    #################################################################
    {
      title:       "Newtonian Physics II: Newton's laws in action",
      description: "<Description goes here>",
      image_url:   "newtonian_physics_ii.jpg",
      difficulty: "Beginner-Intermediate",
      subject: "Newtonian Mechanics",
      challenges: ["<Challenge 1>",
                    "<Challenge 2>",
                    "<Challenge 3>",
                    "<Challenge 4>",
                    "<Challenge 5>",
                    "<Challenge 6>"],
      under_construction: true,
      subject: "Introductory",
      difficulty: "Beginner"
    },

    #################################################################
    # Introduction to Electronics
    #################################################################
    {
      title: "Introduction to electronics",
      description: "<Description goes here>",
      image_url: "newtonian_physics_ii.jpg",

      challenges: ["<Challenge 1>",
                  "<Challenge 2>",
                  "<Challenge 3>",
                  "<Challenge 4>",
                  "<Challenge 5>",
                  "<Challenge 6>"],
      under_construction: true,
      subject: "Introductory",
      difficulty: "Beginner"
    },

    #################################################################
    # Introduction to Electronics II
    #################################################################
    {
      title:        "Introduction to electronics II",
      description: "<Description goes here>",
      image_url:  "newtonian_physics_ii.jpg",

      challenges: ["<Challenge 1>",
                  "<Challenge 2>",
                  "<Challenge 3>",
                  "<Challenge 4>",
                  "<Challenge 5>",
                  "<Challenge 6>"],
      under_construction: true,
      subject: "Introductory",
      difficulty: "Beginner"
    },

    #################################################################
    # Matlab
    #################################################################
    {
      title:       "Matlab",
      description: "<Description goes here>",
      image_url:   "newtonian_physics_ii.jpg",

      challenges: ["<Challenge 1>",
                    "<Challenge 2>",
                    "<Challenge 3>",
                    "<Challenge 4>",
                    "<Challenge 5>",
                    "<Challenge 6>"],
      under_construction: true,
      subject: "Introductory",
      difficulty: "All Levels"
    }
  ]

end


def make_lessons

  lessons = lesson_definitions

  lessons.each do |lesson|

    new_lesson = Lesson.new
    new_lesson.title = lesson[:title]
    new_lesson.description  = lesson[:description]
    new_lesson.difficulty   = lesson[:difficulty]
    new_lesson.subject      = lesson[:subject]
    new_lesson.completed   = lesson[:under_construction]

    lesson[:challenges].each do |challenge|
      new_lesson.challenges.build(title: challenge, content: "Description for challenge goes here")
      puts challenge
    end

    new_lesson.save!
  end

end



## ##########################################
# QUOTE DB POPULATION
## ##########################################

def quote_definitions
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
end

def make_quotes

  quote_refs = quote_definitions

  quote_refs.each do |quote_ref|
    new_quote = Quote.new
    new_quote.quote = quote_ref[:quote]
    puts "\n\t\"#{new_quote.quote}\"\n"
    new_quote.author = quote_ref[:author] || "anonymous"
    new_quote.save!
  end


  #Quote.create!(quote: "The aim of science is not to open the door to everlasting wisdom but to set a limit on everlasting error.", author: "Bertolt Brecht")
  #Quote.create!(quote: "Errors are not in the art but in the artificers.", author: "Sir Issac Newton")
  #Quote.create!(quote: "There is something fascinating about science.
  #                      One gets such wholesale returns of conjecture
  #                      out of such a trifling investment of fact.",
  #              author: "Mark Twain", source: "Life on the Mississippi", date: 1883)
  #Quote.create!(quote: "In rivers, the water that you touch is the last of what has
  #                      passed and the first of that which comes;
  #                      so with present time.", author: "Leonardo da Vinci")
  #Quote.create!(quote: "I do not feel obliged to believe that the same God who has endowed us with sense, reason, and intellect has intended us to forgo their use.", author: "Galileo")
  #Quote.create!(quote: "It is not that I'm so smart. But I stay with the questions much longer.", author: "Albert Einstein")
  #Quote.create!(quote: "When you make the finding yourself - even if you're the last person on Earth to see the light - you'll never forget it.", author: "Carl Sagan")
  #Quote.create!(quote: "Never regard your study as a duty, but as the enviable opportunity to learn to know the liberating influence of beauty in the realm of the spirit for your own personal job and to the profit of the community to which your later work belongs.", author: "Einstein")

end


## Execution
make_quotes
make_lessons