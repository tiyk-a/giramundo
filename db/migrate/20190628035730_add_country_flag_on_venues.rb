class AddCountryFlagOnVenues < ActiveRecord::Migration[5.2]
  def change
  	add_column :venues, :flag, :string
  end
end
