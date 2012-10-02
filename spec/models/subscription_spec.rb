require 'spec_helper'

describe Subscription do

  before(:each) do
    @subscription = FactoryGirl.create(:subscription)
    @user = @subscription.user
    @lesson = @subscription.lesson
    @tasks = @subscription.lesson.tasks
  end

  subject { @subscription }

  it { should respond_to(:last_completed_task_id) }
  it { should respond_to(:set_current_task_id=) }
  it { should respond_to(:completed_tasks) }
  it { should respond_to(:user) }
  it { should respond_to(:lesson) }
  it { should respond_to(:user_id) }
  it { should respond_to(:lesson_id) }
  it { should respond_to(:points) }
  it { should respond_to(:reset) }
  it { should respond_to(:reset_task) }
  it { should respond_to(:next_task_id) }


  its(:user) { should be @user }
  its(:lesson) { should be @lesson }
  specify { @lesson.tasks.should eq(@tasks) }

  its(:completed_tasks) { should be_empty }
  specify { @tasks.should_not be_empty }

  its(:current_task_id) { should be @tasks.first.id }
  its(:next_task_id) { should be @tasks.first.id+1 }
  its(:last_completed_task_id) { should be_nil }


  describe "User completes a task" do
    before do
      @subscription.set_current_task_id=(@tasks.first.id)
      @subscription.complete_task
    end

    its(:completed_tasks) { should have(1).item }

    describe "subscription gets reset" do
      before { @subscription.reset }

      specify { @tasks.should_not be_empty }
      its(:completed_tasks) { should be_empty }
    end

  end


  describe "subscription gets reset" do
    before { @subscription.reset }

    specify { @tasks.should_not be_empty }
    its(:completed_tasks) { should be_empty }
    its(:points) { should be 0 }

    describe "completes four tasks including the last task" do

      before(:each) do
        complete_tasks(@subscription, [0, 7, 5, 9])
      end

      its(:non_completed_task_ids) { should have(6).items }
      its(:completed_tasks) { should have(4).items }
      its(:points) { should be (400) }
      its(:current_task_id) { should be @tasks[1].id }
      its(:next_task_id) { should be @tasks[1].id+1 }

      describe "for last completed task" do
        before { @subscription.set_current_task_id=(@subscription.last_completed_task_id) }

        it { @subscription.completed_task_id?(@subscription.current_task_id).should be true }
        it { expect { @subscription.complete_task }.to change { @subscription.completed_tasks.count }.by(0) }
        it { expect { @subscription.reset_task }.to change { @subscription.completed_tasks.count }.by(-1) }
      end

    end

    describe "completes five tasks not including the last task" do

      before(:each) do
        complete_tasks(@subscription, [0, 7, 9, 5, 3])
      end

      its(:non_completed_task_ids) { should have(5).items }
      its(:completed_tasks) { should have(5).items }
      its(:points) { should be (500) }
      its(:current_task_id) { should be @tasks[4].id }
      its(:next_task_id) { should be @tasks[4].id+1 }

      describe "for last completed task" do
        before { @subscription.set_current_task_id=(@subscription.last_completed_task_id) }

        it { @subscription.completed_task_id?(@subscription.current_task_id).should be true }
        it { expect { @subscription.complete_task }.to change { @subscription.completed_tasks.count }.by(0) }
        it { expect { @subscription.reset_task }.to change { @subscription.completed_tasks.count }.by(-1) }
      end

    end

  end


  describe "completing the same task many times" do
    before(:each) do
      complete_tasks(@subscription, [4, 4, 4, 4, 4, 4, 4, 4, 4])
    end

    its(:last_completed_task_id) { should be @tasks[4].id }
    its(:current_task_id) { should be @tasks[4].id }
    its(:next_task_id) { should be @tasks[5].id }
    its(:completed_tasks) { should have(1).item }
    its(:non_completed_task_ids) { should have(9).items }
    its(:points) { should eql(100) }
  end

  context "completes all tasks" do

    describe "consecutively" do
      before do
        @tasks.each do |task|
          @subscription.set_current_task_id=(task.id)
          @subscription.complete_task
        end
      end

      its(:last_completed_task_id) { should be @tasks[9].id }
      its(:current_task_id) { should be :lesson_finished }
      its(:next_task_id) { should be :lesson_finished }
      its(:completed_tasks) { should have(10).items }
      its(:non_completed_task_ids) { should be_empty }
    end

    describe "in a random order" do
      before do
        complete_tasks(@subscription, [7, 5, 3, 4, 8, 6, 2, 1, 9, 0])
      end

      its(:last_completed_task_id) { should be @tasks[0].id }
      its(:next_task_id) { should be :lesson_finished }
      its(:current_task_id) { should be :lesson_finished }
      its(:completed_tasks) { should have(10).items }
      its(:non_completed_task_ids) { should be_empty }
    end

  end


end