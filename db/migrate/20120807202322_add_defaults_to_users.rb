class AddDefaultsToUsers < ActiveRecord::Migration
  def change
    change_column_default :users, :num_completed_lessons, 0
    change_column_default :users, :num_points, 0
    change_column_default :users, :num_achievements, 0
  end
end
