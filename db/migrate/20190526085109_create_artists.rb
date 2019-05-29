class CreateArtists < ActiveRecord::Migration[5.2]
  def change
    create_table :artists, :options => 'ENGINE=InnoDB ROW_FORMAT=DYNAMIC' do |t|
      t.string :artist_name
      t.string :artist_image
      t.datetime :deleted_at
      t.string :mb_id

      t.timestamps
    end
  end
end
