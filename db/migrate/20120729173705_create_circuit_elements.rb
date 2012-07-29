class CreateCircuitElements < ActiveRecord::Migration
  def change
    create_table :circuit_elements do |t|
      t.string :name
      t.string :token_character
      t.integer :x1
      t.integer :y1
      t.integer :x2
      t.integer :y2
      t.integer :flags
      t.text :params
      t.timestamps
    end
  end
end
