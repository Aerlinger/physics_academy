namespace :db do
  desc "Populate database with sample users and subscriptions"
  task populate: :environment do
    make_users
    make_subscriptions
  end
end

def make_users
  #User.delete_all
  admin = User.create!(name:     "admin",
                       email:    "admin@physicsacademy.org",
                       password: "anthony",
                       password_confirmation: "anthony")

  admin.toggle!(:admin)
  10.times do |n|
    name = Faker::Name.name
    email = "example-#{n+1}@physicsacademy.com"
    password = "password"
    User.create!(name: name, email: email, password: password, password_confirmation: password)
  end
end

def make_subscriptions
  #Subscription.delete_all
  User.all.each do |user|
    user.subscriptions.create(user_id: user.id, lesson_id: user.id % 3)
  end
end