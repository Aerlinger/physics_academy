class CircuitSimulation < ActiveRecord::Base
  attr_accessible :name_unique, :title, :description, :current_speed, :flags, :power_range, :sim_speed, :time_step, :voltage_range

  # Don't need to validate presence of :power_range
  validates_presence_of :flags, :time_step, :sim_speed, :current_speed, :voltage_range
  validates_uniqueness_of :name_unique

  has_many :circuit_elements

  def dump
    dump_str = "$ #{self.flags} #{self.time_step} #{self.sim_speed} #{self.current_speed} #{self.voltage_range} #{self.power_range}\n"

    circuit_elements.all.each do |element|
      dump_str << "#{element.token_character} #{element.x1} #{element.y1} #{element.x2} #{element.y2} #{element.flags} #{element.params}\n"
    end

    dump_str
  end

end
