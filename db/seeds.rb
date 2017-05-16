#deletes all instances inside of database
# User.delete_all
# UserSortType.delete_all
# SortType.delete_all
# ListingLike.delete_all


# users_first_name = ["Dillon",   "Jesus",  "Sean",     "Peter"]
# users_last_name =  ["Streator", "Guzman", "Williams", "Jang"]

# sort_types = ["transit", "pricing", "crime_rate", "school_rate"]

# sort_types.each do |sort_type|
#   type = SortType.new(name: sort_type)
#   type.save
# end

# for i in 0..3 do
#   user = User.new(
#     first_name: users_first_name[i],
#     last_name: users_last_name[i],
#     email: "#{users_first_name[i]}.#{users_last_name[i]}@gmail.com",
#     phone_number: Faker::PhoneNumber.phone_number,
#     password: "password",
#     work_address: Faker::Address.street_address
#   )
#   user.save
#   priority_num = 1
#   sort_types.each do |sort_type|
#     user_sort = UserSortType.new(
#       user_id: user.id,
#       sort_type_id: (sort_types.index(sort_type) + 1),
#       priority: priority_num,
#       selected: priority_num == 1 ? true : false
#     )
#     user_sort.save
#     priority_num += 1
#   end
#   3.times do
#     listing_like = ListingLike.new(
#       user_id: user.id,
#       api_id: rand(1..5000),
#       status: ["selected", "removed"].sample,
#       note: Faker::ChuckNorris.fact
#     )
#     listing_like.save
#   end
# end

require 'nokogiri'
require 'open-uri'
require 'json'
require 'unirest'

Apartment.delete_all

names = ["bucktown", "avondale", "lakeview", "roscoe-village", "logan-square", "clyborn-corridor", "lincoln-park", "humboldt-park", "wickerpark", "goose-island", "old-town", "gold-coast", "ukrainian-village", "river-west", "river-north", "streeterville", "west-town", "little-italy", "west-loop-gate", "loop", "south-loop", "pilsen", "bridgeport", "chinatown", "bronzeville"]


n = 0
page = 1


2.times do
  25.times do 
    url = "https://www.zillow.com/#{names[n]}-Chicago-IL/apartments/"

    url += "#{ page }_p/" if page > 1

    doc = Nokogiri::HTML(open(url, 'User-Agent' => 'chrome'))

        doc.css('div.zsg-photo-card-content').each do |apt|
          link = apt.css('a').first.values.first
          pic = apt.css('img').first.values.first
          address = /(?=[\s\w\$\W])\d\d\d\d\s\w\s\w+\s\w+\S\w/.match apt.content
          bed_bath_feet = apt.css('span.zsg-photo-card-info').first.text
          bedrooms = bed_bath_feet[0]

          baths = bed_bath_feet.split(" · ")[-2]
          if baths != nil 
            baths = baths[0].gsub(/[^0-9]/, '')
          end

          sqft = bed_bath_feet.split(" · ")[-1]
          if sqft[1] == "$"
            sqft = 0
          elsif sqft == nil?
            sqft = 0
          else
            sqft = sqft.gsub!(/[^0-9]/, '')
          end

          rent1 = /(?<=[\\$])\w+.\d+/.match apt.content
          if rent1 != nil
            rent = rent1[0].gsub!(/[^0-9A-Za-z]/, '')
          end
          neighborhood = names[n]

          geocode = Unirest.get("http://maps.google.com/maps/api/geocode/json?address=#{ address }").body

          if geocode["results"][0]
            lat = geocode["results"][0]["geometry"]["location"]["lat"]
          else
            lat = nil
          end
          if geocode["results"][0]
            lng = geocode["results"][0]["geometry"]["location"]["lng"]
          else
            lng = nil
          end

          @apartment = Apartment.new(
                              address: address,
                              sqft: sqft,
                              baths: baths,
                              rent: rent,
                              bedrooms: bedrooms,
                              link: link,
                              pic: pic,
                              neighborhood: neighborhood,
                              lat: lat,
                              lng: lng
                              )
            
          if address && sqft && baths && rent && bedrooms
            @apartment.save
          end
        end
    n += 1
  end
  page += 1
end



puts "Done!"