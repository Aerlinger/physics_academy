class AddStatsToLessons < ActiveRecord::Migration
  def change
    add_column :lessons, :difficulty, :integer, default: 0
    add_column :lessons, :under_construction, :boolean, default: true
  end
end
