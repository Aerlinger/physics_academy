describe Subscription do

  before do
    @subscription = FactoryGirl.create(:subscription)
    @user = @subscription.user
    @lesson = @subscription.lesson
    @challenges = @subscription.lesson.challenges
  end

  subject { @subscription }

  it { should respond_to(:last_completed_challenge_id) }
  it { should respond_to(:current_challenge_id=) }
  it { should respond_to(:completed_challenges) }
  it { should respond_to(:user) }
  it { should respond_to(:lesson) }
  it { should respond_to(:user_id) }
  it { should respond_to(:lesson_id) }
  it { should respond_to(:points) }
  it { should respond_to(:reset) }
  it { should respond_to(:reset_challenge) }
  it { should respond_to(:next_challenge_id) }


  its(:user) { should be @user }
  its(:lesson) { should be @lesson }
  specify { @lesson.challenges.should eq(@challenges) }

  its(:completed_challenges) { should be_empty }
  specify { @challenges.should_not be_empty }

  its(:current_challenge_id) { should be @challenges.first.id }
  its(:next_challenge_id) { should be @challenges.first.id+1 }
  its(:last_completed_challenge_id) { should be_nil }


  describe "User completes a challenge" do
    before do
      @subscription.current_challenge_id=(@challenges.first.id)
      @subscription.complete_challenge
    end

    its(:completed_challenges) { should have(1).item }

    describe "subscription gets reset" do
      before { @subscription.reset }

      specify { @challenges.should_not be_empty }
      its(:completed_challenges) { should be_empty }
    end

  end


  describe "subscription gets reset" do
    before { @subscription.reset }

    specify { @challenges.should_not be_empty }
    its(:completed_challenges) { should be_empty }
    its(:points) { should be 0 }

    describe "completes four challenges including the last challenge" do

      before(:each) do
        complete_challenges(@subscription, [0, 7, 5, 9])
      end

      its(:non_completed_challenge_ids) { should have(6).items }
      its(:completed_challenges) { should have(4).items }
      its(:points) { should be (400) }
      its(:current_challenge_id) { should be @challenges[1].id }
      its(:next_challenge_id) { should be @challenges[1].id+1 }

      describe "for last completed challenge" do
        before { @subscription.current_challenge_id=(@subscription.last_completed_challenge_id) }

        it { @subscription.completed_challenge_id?(@subscription.current_challenge_id).should be true }
        it { expect { @subscription.complete_challenge }.to change { @subscription.completed_challenges.count }.by(0) }
        it { expect { @subscription.reset_challenge }.to change { @subscription.completed_challenges.count }.by(-1) }
      end

    end
  end


  describe "completing the same challenge many times" do
    before(:each) do
      complete_challenges(@subscription, [4, 4, 4, 4, 4, 4, 4, 4, 4])
    end

    its(:last_completed_challenge_id) { should be @challenges[4].id }
    its(:current_challenge_id) { should be @challenges[4].id }
    its(:next_challenge_id) { should be @challenges[5].id }
    its(:completed_challenges) { should have(1).item }
    its(:non_completed_challenge_ids) { should have(9).items }
    its(:points) { should eql(100) }
  end

  context "completes all challenges" do

    describe "consecutively" do
      before do
        @challenges.each do |challenge|
          @subscription.current_challenge_id=(challenge.id)
          @subscription.complete_challenge
        end
      end

      its(:last_completed_challenge_id) { should be @challenges[9].id }
      its(:current_challenge_id) { should be :lesson_finished }
      its(:next_challenge_id) { should be :lesson_finished }
      its(:completed_challenges) { should have(10).items }
      its(:non_completed_challenge_ids) { should be_empty }
    end

    describe "in a random order" do
      before do
        complete_challenges(@subscription, [7, 5, 3, 4, 8, 6, 2, 1, 9, 0])
      end

      its(:last_completed_challenge_id) { should be @challenges[0].id }
      its(:next_challenge_id) { should be :lesson_finished }
      its(:current_challenge_id) { should be :lesson_finished }
      its(:completed_challenges) { should have(10).items }
      its(:non_completed_challenge_ids) { should be_empty }
    end

  end


end