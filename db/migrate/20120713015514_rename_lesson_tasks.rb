class RenameLessonTasks < ActiveRecord::Migration
  def up
    rename_table :lesson_tasks, :challenges
  end

  def down
    rename_table :challenges, :lesson_tasks
  end
end
