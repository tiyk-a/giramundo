class Concert < ApplicationRecord
  enum origin: { "manual": 0, "Ticket Master": 1, "Songkick": 2 }
  belongs_to :venue, optional: true
  has_many :keeps, dependent: :destroy, inverse_of: :concert
  has_many :performers, inverse_of: :concert
  has_many :artists, through: :performers
  acts_as_paranoid
  validates :origin, presence: true
  validates :concert_name, presence: true

  def self.full
     where.not(image: nil, date: nil, venue_id: nil)
  end
end
