class CreateQuotes < ActiveRecord::Migration
  def change
    create_table :quotes do |t|

      t.string :quote
      t.string :author, default: "anonymous"
      t.string :source

      t.timestamps
    end
  end
end
