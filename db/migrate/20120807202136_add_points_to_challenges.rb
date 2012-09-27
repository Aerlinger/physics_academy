class AddPointsToChallenges < ActiveRecord::Migration
  def change
    add_column :tasks, :points, :integer, default: 100
  end
end
