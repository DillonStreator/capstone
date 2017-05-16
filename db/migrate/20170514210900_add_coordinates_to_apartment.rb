class AddCoordinatesToApartment < ActiveRecord::Migration[5.0]
  def change
    add_column :apartments, :lat, :float
    add_column :apartments, :lng, :float
  end
end
