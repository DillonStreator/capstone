class ListingLikesController < ApplicationController
  def index
    @apartments = current_user.apartments
    @zillow = "zillow.com"
    render "index.html.erb"
  end

  def create
    
  end
end
