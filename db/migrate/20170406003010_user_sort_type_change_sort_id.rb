class UserSortTypeChangeSortId < ActiveRecord::Migration[5.0]
  def change
    rename_column :user_sort_types, :sort_id, :sort_type_id
  end
end
