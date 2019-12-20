class CreateTalks < ActiveRecord::Migration[5.2]
  def change
    create_table :talks do |t|
      t.references :room, foreign_key: true, :null => false
      t.string :name, limit: 15, :null => false
      t.string :message, limit: 150, :null => false
      t.string :ip, :null => false
      t.timestamps
    end
  end
end
