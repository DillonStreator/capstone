class Api::V1::NearbyLocationsController < ApplicationController

  def search
    api_key = ENV['API_KEY']
    @directions = Unirest.get("https://maps.googleapis.com/maps/api/directions/json?origin=#{params[:origin]}&destination=#{params[:destination]}&mode=#{params[:mode]}&key=#{api_key}").body
    @legs = @directions["routes"][0]["legs"]
    @duration_text = @directions["routes"][0]["legs"][0]['duration']['text']
    render "nearbyResult.json.jbuilder"
  end

  def crimes
    @crimes = Unirest.get("https://data.cityofchicago.org/resource/6zsd-86xi.json").body
    render "chiCrimes.json.jbuilder"
  end

  def apartments
    @apartments = Apartment.limit(25).uniq.pluck_to_hash(['id', 'address', 'lat', 'lng', 'sqft', 'baths', 'rent', 'bedrooms', 'link', 'pic'])
    render "apartments.json.jbuilder"
  end

end
