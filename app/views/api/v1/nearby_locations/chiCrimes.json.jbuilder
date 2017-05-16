json.array! @crimes.each do |crime|
  if crime["location"]
    json.latLng crime["location"]["coordinates"]
  end
end