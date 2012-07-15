class AddIndexToUsersEmail < ActiveRecord::Migration
  def change
    # Add index to email in users table
    add_index :users, :email, unique: true
  end
end
