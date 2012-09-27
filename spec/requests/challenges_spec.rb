require 'spec_helper'

describe "tasks" do

  subject { page }

  before do
    visit_first_lesson
  end

  describe "should have task buttons" do
    it { should have_selector('a#task_1') }
    it { should have_selector('a#task_2') }
    it { should have_selector('a#task_3') }
  end

end