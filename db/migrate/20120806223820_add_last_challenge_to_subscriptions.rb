class AddLastChallengeToSubscriptions < ActiveRecord::Migration
  def change
    add_column :subscriptions, :last_task, :integer, default: 0
  end
end
