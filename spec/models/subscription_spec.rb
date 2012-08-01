describe Subscription do

  before do
    @user = FactoryGirl.build(:user)
    @lesson = FactoryGirl.build(:lesson)
    @subscription = Subscription.new
    @subscription.user = @user
    @subscription.lesson = @lesson
  end

  it { should respond_to(:last_challenge) }

end