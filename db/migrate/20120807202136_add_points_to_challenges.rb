class AddPointsToChallenges < ActiveRecord::Migration
  def change
    add_column :challenges, :points, :integer, default: 100
  end
end
