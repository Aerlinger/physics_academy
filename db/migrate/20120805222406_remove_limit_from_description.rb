class RemoveLimitFromDescription < ActiveRecord::Migration
  def change
    change_column :lessons, :description, :text, limit: 1500
  end
end
