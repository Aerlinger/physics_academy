# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

def create_lesson(title, description, image_url, challenges)

  lesson = Lesson.find_or_create_by_title(title) do |l|
    l.description = description
    l.image_url = image_url
    l.difficulty = 0
    l.save!

    challenges.each do |challenge|
      l.challenges.create!(title: challenge, content: "Description for challenge goes here")
    end
  end


end


#################################################################
# Introduction to Physics
#################################################################
title       = "Introduction to Physics"
description = "Completely new to physics? This is where to start."
image_url   = "introduction_to_physics.jpg"

challenges = ["What is physics?",
              "Units and Measurements",
              "Significant Figures",
              "Conversion of Units",
              "Dimensional Analysis",
              "In Review"]

create_lesson(title, description, image_url, challenges)


#################################################################
# Newtonian Physics
#################################################################
title       = "Newtonian Physics I: The laws of motion"
description = "Newtonian physics describes the motion and interaction of physical bodies under forces."
image_url   = "newtonian_physics_i.jpg"


challenges = ["What is physics?",
              "Newton's Laws'",
              "Newton's First Law: An object in motion remains in motion. An object at rest remains at rest",
              "Newton's Second Law: Force equals mass times acceleration",
              "Newton's Third Law: For every action there is an equal and opposite reaction",
              "In Review"]

create_lesson(title, description, image_url, challenges)


#################################################################
# Newtonian Physics II
#################################################################
title       = "Newtonian Physics II: \"Newton's laws in action'\""
description = "<Description goes here>"
image_url   = "newtonian_physics_ii.jpg"

challenges = ["<Challenge 1>",
              "<Challenge 2>",
              "<Challenge 3>",
              "<Challenge 4>",
              "<Challenge 5>",
              "<Challenge 6>"]

create_lesson(title, description, image_url, challenges)


#################################################################
# Introduction to Electronics
#################################################################
title       = "Introduction to electronics"
description = "<Description goes here>"
image_url   = "newtonian_physics_ii.jpg"

challenges = ["<Challenge 1>",
              "<Challenge 2>",
              "<Challenge 3>",
              "<Challenge 4>",
              "<Challenge 5>",
              "<Challenge 6>"]

create_lesson(title, description, image_url, challenges)


#################################################################
# Introduction to Electronics
#################################################################
title       = "Introduction to electronics II"
description = "<Description goes here>"
image_url   = "newtonian_physics_ii.jpg"

challenges = ["<Challenge 1>",
              "<Challenge 2>",
              "<Challenge 3>",
              "<Challenge 4>",
              "<Challenge 5>",
              "<Challenge 6>"]

create_lesson(title, description, image_url, challenges)


#################################################################
# Matlab
#################################################################
title       = "Matlab"
description = "<Description goes here>"
image_url   = "newtonian_physics_ii.jpg"

challenges = ["<Challenge 1>",
              "<Challenge 2>",
              "<Challenge 3>",
              "<Challenge 4>",
              "<Challenge 5>",
              "<Challenge 6>"]

create_lesson(title, description, image_url, challenges)


