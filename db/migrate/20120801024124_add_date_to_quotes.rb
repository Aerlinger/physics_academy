class AddDateToQuotes < ActiveRecord::Migration
  def change
    add_column :quotes, :date, :integer
  end
end
