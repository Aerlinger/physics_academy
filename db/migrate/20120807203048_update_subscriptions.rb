class UpdateSubscriptions < ActiveRecord::Migration
  def change
    rename_column :subscriptions, :last_challenge, :last_attempted_challenge
    change_column_default :subscriptions, :last_attempted_challenge, 1
    add_column :subscriptions, :last_completed_challenge, :integer, default: 0
  end
end
