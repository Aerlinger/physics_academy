class CreateLessonTasks < ActiveRecord::Migration
  def change
    create_table :lesson_tasks do |t|
      t.string :title
      t.string :description
      t.string :hint

      t.timestamps
    end
  end
end
