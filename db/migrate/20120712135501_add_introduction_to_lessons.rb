class AddIntroductionToLessons < ActiveRecord::Migration
  def change
    add_column :lessons, :introduction, :string
  end
end
