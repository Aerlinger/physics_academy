class SimulationsController < ApplicationController

  def show
    respond_to do |format|
      format.json { render template: "newton/simulations/#{params[:id]}" }
    end
  end

end
