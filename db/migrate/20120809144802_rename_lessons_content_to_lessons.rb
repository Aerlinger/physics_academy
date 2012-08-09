class RenameLessonsContentToLessons < ActiveRecord::Migration
  def change
    rename_table :lessons_content, :lessons
  end
end
