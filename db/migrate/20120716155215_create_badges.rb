class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.string :title
      t.string :description
      t.string :icon

      t.timestamps
    end
  end
end
