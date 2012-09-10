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

  factory :subscription do
    association :user
    association :lesson
    after_build do |instance|
      10.times do
        instance.lesson.challenges << Factory.build(:challenge)
      end
    end
  end

end

Factory.define :challenge do |f|
  f.sequence(:title) { |n| "Title: Lesson challenge#{n}" }
  f.sequence(:content) { |n| "Content for lesson challenge #{n}" }
end

Factory.define :lesson do |f|
  f.sequence(:title) { |n| "Title: Lesson #{n}" }
  f.sequence(:description) { |n| "Description for Lesson #{n}" }
end

Factory.define :user_with_subscription, class: 'User' do |u|
  u.after_build do |user|
    user.subscriptions << Factory.build(:subscription)
  end
end