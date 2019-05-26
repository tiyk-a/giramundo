class CreateConcerts < ActiveRecord::Migration[5.2]
  def change
    create_table :concerts do |t|
      t.string :concert_name
      t.text :source
      t.string :image
      t.string :tm_id
      t.datetime :date
      t.string :timezone
      t.string :local_date
      t.integer :venue_id
      t.integer :origin
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
