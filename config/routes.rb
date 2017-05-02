Rails.application.routes.draw do

  get "/" => "listings#home"
  get "/listings" => "listings#index"

  namespace :api do
    namespace :v1 do
      get "/nearbyLocations" => "nearby_locations#search"
    end
  end
end
