describe Subscription do

  before do
    @user = FactoryGirl.build(:user)
    @lesson = FactoryGirl.build(:lesson)
    @subscription = Subscription.new(user: @user, lesson: @lesson)
  end

  it { should respond_to(:last_lesson) }

end