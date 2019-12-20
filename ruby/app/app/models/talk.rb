class Talk < ApplicationRecord
  validates :room_id, presence: true
  validates :name, presence: true, length: { minimum: 1, maximum: 15 }
  validates :message, presence: true, length: { minimum: 1, maximum: 150 }
  validates :ip, presence: true
end
