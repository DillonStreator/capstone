class Api::V1::NearbyLocationsController < ApplicationController

  def search
    @API_KEY = ENV["API_KEY"]
    @directions = Unirest.get("https://maps.googleapis.com/maps/api/directions/json?origin=#{params[:origin]}&destination=#{params[:destination]}&mode=#{params[:mode]}&key=#{ENV['API_KEY']}").body
    puts @directions
    render "nearbyResult.json.jbuilder"
  end
end
