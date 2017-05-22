Rails.application.routes.draw do

  get "/" => "listings#home"
  get "/listings" => "listings#index"

  get "/listing_likes" => "listing_likes#index"
  get "/like_listing/:id" => "listing_likes#create"
  get "/remove_listing/:id" => "listing_likes#destroy"

  get "/login" => "sessions#new"
  post "/login" => "sessions#create"
  get "/logout" => "sessions#destroy"


  namespace :api do
    namespace :v1 do
      get "/nearbyLocations" => "nearby_locations#search"

      get "/nearbyLocations/crimes" => "nearby_locations#crimes"

      get "/apartments" => "nearby_locations#apartments"
    end
  end
end
