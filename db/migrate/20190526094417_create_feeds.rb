class CreateFeeds < ActiveRecord::Migration[5.2]
  def change
    create_table :feeds, :options => 'ENGINE=InnoDB ROW_FORMAT=DYNAMIC' do |t|
      t.string :name
      t.string :url
      t.text :description

      t.timestamps
    end
  end
end
