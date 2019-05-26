class Performer < ApplicationRecord
  belongs_to :artist
  belongs_to :concert

  validates :concert_id, presence: true
  validates :artist_id, presence: true
end
