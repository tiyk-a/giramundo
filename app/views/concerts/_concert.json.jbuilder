json.extract! concert, :id, :concert_name, :source, :image, :tm_id, :date, :timezone, :local_date, :venue_id, :origin, :deleted_at, :created_at, :updated_at
json.url concert_url(concert, format: :json)
