class RenameSubscriptionChallenges < ActiveRecord::Migration
  def change
    rename_column :subscriptions, :current_challenge_id, :current_challenge_id
    rename_column :subscriptions, :last_completed_challenge, :last_completed_challenge_id
  end
end
