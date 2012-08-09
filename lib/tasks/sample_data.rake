namespace :db do
  desc "Populate database with sample users and subscriptions"
  task populate: :environment do
    make_users
    make_subscriptions
  end
end

def make_users
  User.delete_all

  # Create the admin first
  admin = User.create!(name:     "admin",
                       email:    "admin@physicsacademy.org",
                       password: "default_password",
                       password_confirmation: "default_password")

  admin.toggle!(:admin)

  # create 10 users
  10.times do |n|
    name = Faker::Name.name
    email = "SampleUser-#{n+1}@pa.com"
    password = "password"
    User.create!(name: name, email: email, password: password, password_confirmation: password)
  end

  # I am the serial killer
end

def make_subscriptions
  Subscription.delete_all

  # Create a subscription for each user
  User.all.each do |user|
    user.subscriptions.create(user_id: user.id, lesson_id: user.id % Lesson.all.size)
  end
end