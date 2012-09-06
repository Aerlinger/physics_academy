FactoryGirl.define do

  load "#{Rails.root}/app/models/user.rb"

  # Creates a long list of users
  factory :user do
    sequence(:name)  { |n| "Person #{n}" }
    sequence(:email) { |n| "person_#{n}@example.com" }
    password "foobar"
    password_confirmation "foobar"

    factory :admin do
      admin true
    end
  end

  factory :lesson do
    sequence(:title) { |n| "Lesson #{n}" }
    sequence(:description) { |n| "Description for lesson #{n}" }
  end

  factory :challenges do
    sequence(:title) { |n| "Lesson task#{n}" }
    sequence(:content) { |n| "Content for lesson task #{n}" }
  end

end