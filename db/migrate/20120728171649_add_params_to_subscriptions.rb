class AddParamsToSubscriptions < ActiveRecord::Migration
  def change
    add_column :subscriptions, :completed_challenges, :text
  end
end
