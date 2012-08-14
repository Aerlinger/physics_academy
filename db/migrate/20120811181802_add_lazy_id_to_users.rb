class AddLazyIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :lazy_id, :string
  end
end
