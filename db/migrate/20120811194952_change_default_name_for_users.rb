class ChangeDefaultNameForUsers < ActiveRecord::Migration
  def change
    change_column_default :users, :name, default: "Anonymous User"
  end
end
