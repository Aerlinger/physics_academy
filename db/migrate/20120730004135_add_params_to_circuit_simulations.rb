class AddParamsToCircuitSimulations < ActiveRecord::Migration
  def change
    add_column :circuit_simulations, :topic, :string
    add_column :circuit_simulations, :completion_status, :string, default: "under_development"
  end
end
