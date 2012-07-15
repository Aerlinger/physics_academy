class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.integer :num_completed_lessons
      t.integer :num_points
      t.integer :num_achievements

      t.timestamps
    end
  end
end
