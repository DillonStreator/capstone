class CreateUserSortTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :user_sort_types do |t|
      t.integer :user_id
      t.integer :sort_id
      t.integer :priority
      t.boolean :selected

      t.timestamps
    end
  end
end
