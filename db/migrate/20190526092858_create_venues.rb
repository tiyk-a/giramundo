class CreateVenues < ActiveRecord::Migration[5.2]
  def change
    create_table :venues, :options => 'ENGINE=InnoDB ROW_FORMAT=DYNAMIC' do |t|
      t.string :name
      t.float :latitude
      t.float :longitude
      t.string :country
      t.string :city
      t.string :address
      t.string :url

      t.timestamps
    end
  end
end
