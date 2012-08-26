class RemoveEvaluations < ActiveRecord::Migration
  def up
    drop_table  :rs_reputations
    drop_table  :rs_reputation_messages
    drop_table  :rs_evaluations
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
