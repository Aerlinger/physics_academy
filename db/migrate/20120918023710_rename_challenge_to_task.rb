class RenameChallengeToTask < ActiveRecord::Migration
  def up
    rename_table :challenges, :tasks
  end

  def down
    rename_table :tasks, :challenges
  end
end
