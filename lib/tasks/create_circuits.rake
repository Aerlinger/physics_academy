namespace :db do
  desc "Create Sample Circuits"
  task create_circuits: :environment do
    CircuitSimulation.delete_all
    make_lrc
  end
end

def make_lrc

  new_simulation = CircuitSimulation.new( flags: 1, time_step: 5.0e-6, sim_speed: 14.235633750745258, current_speed: 50, voltage_range: 5.0, power_range: 50 )
  new_simulation.name_unique  = "default"
  new_simulation.title        = "RL Default Circuit"
  new_simulation.description  = "Resistor and Inductor in series with a DC voltage source"
  new_simulation.save!

  new_simulation.circuit_elements.create!(x1: 480, y1: 160, x2: 416, y2: 160, flags: 0, name: "Voltage source", token_character: "R")


  resistor = new_simulation.circuit_elements.new(name: "Resistor", token_character: "r")
  resistor.x1 = 480
  resistor.y1 = 160
  resistor.x2 = 480
  resistor.y2 = 272
  resistor.flags = 0
  resistor.params = [1000]
  resistor.save!


  inductor = CircuitElement.new(name: "Inductor", token_character: "l")
  inductor.x1 = 480
  inductor.y1 = 272
  inductor.x2 = 480
  inductor.y2 = 372
  inductor.flags = 0
  inductor.params = [3, 0]
  new_simulation.circuit_elements << inductor

  ground = CircuitElement.new(name: "Ground", token_character: "g")
  ground.x1 = 480
  ground.y1 = 372
  ground.x2 = 480
  ground.y2 = 472
  ground.flags = 0
  new_simulation.circuit_elements << ground



end