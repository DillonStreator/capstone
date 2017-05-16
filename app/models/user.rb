class User < ApplicationRecord
  has_secure_password

  has_many :listing_likes
  has_many :apartments, through: :listing_likes
  has_many :user_sort_types
  has_many :sorts, through: :user_sort_types
  
end
