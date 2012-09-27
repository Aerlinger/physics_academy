class RenameChallengeToTaskInUsers < ActiveRecord::Migration
  def change
    rename_column :subscriptions, :completed_challenges, :completed_tasks
    rename_column :subscriptions, :current_challenge_id, :current_task_id
    rename_column :subscriptions, :last_completed_task_id, :last_completed_task_id
    rename_column :users, :current_challenge_id, :current_task_id
  end
end
