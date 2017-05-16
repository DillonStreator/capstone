class Apartment < ApplicationRecord
  has_many :listing_likes
  has_many :users, through: :listing_likes


  def self.pluck_to_hash(keys)
    pluck(*keys).map{|pa| Hash[keys.zip(pa)]}
  end
end
