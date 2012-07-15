namespace :db do
  desc "Populate database with sample data"
  task populate: :environment do
    make_users
    make_lessons
    make_lesson_challenges
  end
end

def make_users
  admin = User.create!(name:     "Admin",
                       email:    "Admin@physicsacademy.org",
                       password: "anthony",
                       password_confirmation: "anthony")

  admin.toggle!(:admin)
  99.times do |n|
    name = Faker::Name.name
    email = "example-#{n+1}@physicsacademy.com"
    password = "password"
    User.create!(name: name, email: email, password: password, password_confirmation: password)
  end
end

def make_lessons
  15.times do |i|
    title = "Lesson #{i+1}"
    description = "Description for #{title}"
    Lesson.create!(description: description, title: title)
  end
end

def make_lesson_challenges
  lessons = Lesson.all

  lessons.each do |lesson|
    7.times do |i|
      title = "Task: #{i+1} #{Faker::Lorem.words(1)}"
      content = "Content for #{title}:   "
      lesson.challenges.create!(title: title, content: content)
    end
  end

end