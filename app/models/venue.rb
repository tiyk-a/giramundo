class Venue < ApplicationRecord
  has_many :concerts, dependent: :destroy
  enum origin: { "manual": 0, "Ticket Master": 1 }
  geocoded_by :full_address
  after_validation :geocode
  def full_address
    [country, city, address].compact.join(', ')
  end

  validates :name, presence: true

  def self.full
  	where.not(name: nil, country: nil, city: nil)
  end

  def self.details
  	full.where.not(address: nil, latitude: nil, longitude: nil, url: nil)
  end
end