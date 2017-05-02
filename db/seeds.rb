#deletes all instances inside of database
User.delete_all
UserSortType.delete_all
SortType.delete_all
ListingLike.delete_all


users_first_name = ["Dillon",   "Jesus",  "Sean",     "Peter"]
users_last_name =  ["Streator", "Guzman", "Williams", "Jang"]

sort_types = ["transit", "pricing", "crime_rate", "school_rate"]

sort_types.each do |sort_type|
  type = SortType.new(name: sort_type)
  type.save
end

for i in 0..3 do
  user = User.new(
    first_name: users_first_name[i],
    last_name: users_last_name[i],
    email: "#{users_first_name[i]}.#{users_last_name[i]}@gmail.com",
    phone_number: Faker::PhoneNumber.phone_number,
    password: "password",
    work_address: Faker::Address.street_address
  )
  user.save
  priority_num = 1
  sort_types.each do |sort_type|
    user_sort = UserSortType.new(
      user_id: user.id,
      sort_type_id: (sort_types.index(sort_type) + 1),
      priority: priority_num,
      selected: priority_num == 1 ? true : false
    )
    user_sort.save
    priority_num += 1
  end
  3.times do
    listing_like = ListingLike.new(
      user_id: user.id,
      api_id: rand(1..5000),
      status: ["selected", "removed"].sample,
      note: Faker::ChuckNorris.fact
    )
    listing_like.save
  end
end


puts "Done!"