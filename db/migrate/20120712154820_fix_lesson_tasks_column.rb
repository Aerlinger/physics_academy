class FixLessonTasksColumn < ActiveRecord::Migration
  def change
    rename_column :lesson_tasks, :description, :content
  end
end
