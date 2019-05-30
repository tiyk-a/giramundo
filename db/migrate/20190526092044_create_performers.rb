class CreatePerformers < ActiveRecord::Migration[5.2]
  def change
    create_table :performers do |t|
      t.integer :concert_id
      t.integer :artist_id

      t.timestamps
    end
  end
end
