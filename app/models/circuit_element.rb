class CircuitElement < ActiveRecord::Base

  after_initialize :init_params

  serialize :params
  attr_accessible :name, :token_character, :flags, :params, :type, :x1, :x2, :y1, :y2

  validates_presence_of :token_character, :x1, :x2

  belongs_to :circuit_simulation

  private

    def init_params
      self.params ||= []
    end

end
