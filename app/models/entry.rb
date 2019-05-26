class Entry < ApplicationRecord
  belongs_to :feed
  belongs_to :artist, optional: true
end
