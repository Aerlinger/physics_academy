class CreateCircuitSimulations < ActiveRecord::Migration
  def change
    create_table :circuit_simulations do |t|
      t.string :name_unique
      t.string :title
      t.string :description
      t.integer :flags
      t.float :time_step
      t.float :sim_speed
      t.float :current_speed
      t.float :voltage_range
      t.float :power_range

      t.timestamps
    end
  end
end
