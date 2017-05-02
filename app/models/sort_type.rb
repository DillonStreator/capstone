class SortType < ApplicationRecord

  has_many :user_sort_types
  has_many :users, through: :user_sort_types

end
