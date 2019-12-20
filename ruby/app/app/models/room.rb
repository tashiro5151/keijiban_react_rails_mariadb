class Room < ApplicationRecord
  validates :name, presence: true, length: { minimum: 1, maximum: 50 }
  validates :genreId, presence: true, :numericality => { :only_interger => true, :greater_than_or_equal_to => 0, :less_than_or_equal_to => 17, :message => '入力値が0~17の範囲外です' }
end
