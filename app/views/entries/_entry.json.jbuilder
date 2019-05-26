json.extract! entry, :id, :title, :published, :content, :url, :author, :feed_id, :artist_id, :created_at, :updated_at
json.url entry_url(entry, format: :json)
