class UpdateSubscriptions < ActiveRecord::Migration
  def change
    rename_column :subscriptions, :last_task, :current_challenge_id
    change_column_default :subscriptions, :current_challenge_id, 1
    add_column :subscriptions, :last_completed_challenge, :integer, default: 0
  end
end
