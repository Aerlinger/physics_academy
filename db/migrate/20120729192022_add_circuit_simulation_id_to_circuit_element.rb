class AddCircuitSimulationIdToCircuitElement < ActiveRecord::Migration
  def change
    add_column :circuit_elements, :circuit_simulation_id, :integer
  end
end
