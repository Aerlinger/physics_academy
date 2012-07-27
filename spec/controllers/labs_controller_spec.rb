require 'spec_helper'

describe LabsController do

  describe "GET 'index'" do
    it "returns http success" do
      get 'index'
      response.should be_success
    end
  end

  describe "GET 'circuits'" do
    it "returns http success" do
      get 'circuits'
      response.should be_success
    end
  end

  describe "GET 'mechanics'" do
    it "returns http success" do
      get 'mechanics'
      response.should be_success
    end
  end

end
