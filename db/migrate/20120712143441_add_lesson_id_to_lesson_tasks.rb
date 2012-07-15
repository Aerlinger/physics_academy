class AddLessonIdToLessonTasks < ActiveRecord::Migration
  def change
    add_column :lesson_tasks, :lesson_id, :integer
  end

end
