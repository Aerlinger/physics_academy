class ChangeUsersNameDefault < ActiveRecord::Migration
  def change
    change_column_default :users, :name, ""
  end
end
