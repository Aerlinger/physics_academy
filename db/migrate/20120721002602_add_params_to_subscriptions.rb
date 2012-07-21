class AddParamsToSubscriptions < ActiveRecord::Migration
  def change
    add_column :subscriptions, :completed_lessons, :string
  end
end
