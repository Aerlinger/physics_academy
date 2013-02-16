require 'spec_helper'

describe UsersController do

  include Devise::TestHelpers

  before :each do
    #request.env['devise.mapping'] = Devise.mappings[:sessions]
    #request.env['devise.mapping'] = Devise.mappings[:user]
  end
end