class ListingLikesController < ApplicationController
  def index
    @apartments = current_user.apartments
    @zillow = "zillow.com"
    render "index.html.erb"
  end

  def create
    like = ListingLike.new(
      apartment_id: params[:id],
      user_id: current_user.id
    )
    like.save
    flash[:success] = "Successfully liked listing."
    redirect_to "/listing_likes"
  end

  def destroy
    like = ListingLike.find_by(apartment_id: params[:id])
    like.destroy
    flash[:success] = "Successfully deleted listing."
    redirect_to "/listing_likes"
  end
end
