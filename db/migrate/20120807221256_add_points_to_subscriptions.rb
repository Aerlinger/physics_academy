class AddPointsToSubscriptions < ActiveRecord::Migration
  def change
    add_column :subscriptions, :points, :integer, default: 0
  end
end
