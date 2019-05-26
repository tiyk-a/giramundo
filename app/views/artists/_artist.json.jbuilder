json.extract! artist, :id, :artist_name, :artist_image, :deleted_at, :mb_id, :created_at, :updated_at
json.url artist_url(artist, format: :json)
