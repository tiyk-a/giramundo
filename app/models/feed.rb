class Feed < ApplicationRecord
  has_many :entries, dependent: :destroy
  validates :url, presence: true
end
