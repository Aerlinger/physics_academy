describe Subscription do

  before do
    @user = FactoryGirl.build(:user)
    @lesson = FactoryGirl.build(:lesson)
    @subscription = Subscription.new
    @subscription.user = @user
    @subscription.lesson = @lesson
  end

  it { should respond_to(:last_completed_challenge_id) }
  it { should respond_to(:current_challenge_id) }
  it { should respond_to(:completed_challenges) }
  it { should respond_to(:user) }
  it { should respond_to(:lesson) }
  it { should respond_to(:user_id) }
  it { should respond_to(:lesson_id) }
  it { should respond_to(:points) }

end