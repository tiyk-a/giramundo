class CreateEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :entries, :options => 'ENGINE=InnoDB ROW_FORMAT=DYNAMIC' do |t|
      t.string :title
      t.datetime :published
      t.text :content
      t.string :url
      t.string :author
      t.integer :feed_id
      t.integer :artist_id

      t.timestamps
    end
  end
end
