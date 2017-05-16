class ChangeListingLikesapiIdtoapartmentId < ActiveRecord::Migration[5.0]
  def change
    rename_column :listing_likes, :api_id, :apartment_id
  end
end
