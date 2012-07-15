class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.integer :user_id
      t.integer :lesson_id

      t.timestamps
    end

    add_index :subscriptions, :user_id
    add_index :subscriptions, :lesson_id
    # Composite index:
    add_index :subscriptions, [:user_id, :lesson_id], unique: true
  end
end
