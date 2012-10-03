class RenameCompletedTasksToCompletedTaskIds < ActiveRecord::Migration
  def change
    rename_column :subscriptions, :completed_tasks, :completed_task_ids
  end
end
