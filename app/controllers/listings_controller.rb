class ListingsController < ApplicationController
  def home
    render 'home.html.erb'
  end

  def index
    uniq_apartments = Apartment.uniq.pluck_to_hash(['id', 'address', 'lat', 'lng', 'sqft', 'baths', 'rent', 'bedrooms', 'link', 'pic'])
    p uniq_apartments
    @API_KEY = ENV['API_KEY1']
    @employer = params[:employer]
    render 'index.html.erb'
  end
end
