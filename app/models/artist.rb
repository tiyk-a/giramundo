class Artist < ApplicationRecord
  has_many :watch_artists, dependent: :destroy
  has_many :performers, dependent: :destroy, inverse_of: :artist
  has_many :concerts, through: :performers
  has_many :entries, dependent: :destroy, inverse_of: :artist
  acts_as_paranoid
  validates :artist_name, presence: true
  def self.full
     where.not(artist_name: nil, artist_image: nil, mb_id: nil)
  end
end
