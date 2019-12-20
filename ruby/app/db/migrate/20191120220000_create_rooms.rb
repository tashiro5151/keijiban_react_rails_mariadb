class CreateRooms < ActiveRecord::Migration[5.2]
  def change
    create_table :rooms do |t|
      t.string :name, limit: 50, :null => false
      t.integer :genreId, :null => false
      t.timestamps
    end
  end
end
