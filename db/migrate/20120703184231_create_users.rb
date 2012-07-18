class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.integer :num_completed_lessons, default: 0
      t.integer :num_points, default: 0
      t.integer :num_achievements, default: 0

      t.timestamps
    end
  end
end
