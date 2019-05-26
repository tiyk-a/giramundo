class WatchArtist < ApplicationRecord
  belongs_to :artist, optional: true
  belongs_to :user, optional: true

  validates :user_id, presence: true
  validates :artist_id, presence: true
end
