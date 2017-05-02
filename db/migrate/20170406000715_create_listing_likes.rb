class CreateListingLikes < ActiveRecord::Migration[5.0]
  def change
    create_table :listing_likes do |t|
      t.integer :user_id
      t.integer :api_id
      t.string :status
      t.text :note

      t.timestamps
    end
  end
end
