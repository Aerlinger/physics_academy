class AddLastChallengeToSubscriptions < ActiveRecord::Migration
  def change
    add_column :subscriptions, :last_challenge, :integer, default: 0
  end
end
