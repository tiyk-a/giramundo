class Keep < ApplicationRecord
  belongs_to :user
  belongs_to :concert

  validates :concert_id, presence: true
  validates :user_id, presence: true
end
