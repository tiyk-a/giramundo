json.extract! venue, :id, :name, :latitude, :longitude, :country, :city, :address, :url, :created_at, :updated_at
json.url venue_url(venue, format: :json)
