class UpdateUsers < ActiveRecord::Migration
  def change
    add_column :users, :location,     :string
    add_column :users, :about_me,     :text
    add_column :users, :website_url,  :string
    add_column :users, :twitter,      :string
    add_column :users, :linkedin_url, :string
    add_column :users, :avatar,       :text
  end
end
