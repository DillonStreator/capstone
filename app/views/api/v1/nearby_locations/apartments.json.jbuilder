json.array! @apartments.each do |apartment|
  json.id apartment['id']
  json.address apartment['address']
  json.lat apartment['lat']
  json.lng apartment['lng']
  json.sqft apartment['sqft']
  json.baths apartment['baths']
  json.rent apartment['rent']
  json.bedrooms apartment['bedrooms']
  json.link apartment['link']
  json.pic apartment['pic']
end