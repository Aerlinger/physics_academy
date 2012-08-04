class UpdateLessons < ActiveRecord::Migration
  def change
    change_table :lessons do |t|
      t.change :difficulty, :string
    end

    add_column :lessons, :under_construction, :boolean, default: true
    add_column :lessons, :subject, :string

  end
end
