class AddImageUrlToLessons < ActiveRecord::Migration
  def change
    add_column :lessons, :image_url, :string
  end
end
