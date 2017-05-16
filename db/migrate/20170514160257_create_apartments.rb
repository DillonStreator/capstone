class CreateApartments < ActiveRecord::Migration[5.0]
  def change
    create_table :apartments do |t|
      t.string :address
      t.integer :sqft
      t.integer :baths
      t.integer :rent
      t.integer :bedrooms
      t.string :link
      t.string :pic
      t.string :neighborhood

      t.timestamps
    end
  end
end
