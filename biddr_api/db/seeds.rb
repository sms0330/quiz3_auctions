# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Auction.delete_all
Bid.delete_all
User.delete_all

PASSWORD = "1234";

super_user = User.create( 
    first_name: "Joseph", 
    last_name: "Son", 
    email: "sms0330@codecore.ca", 
    password: PASSWORD,
) 

20.times do 
    first_name=Faker::Name.first_name
    last_name=Faker::Name.last_name
    User.create( 
        first_name: first_name, 
        last_name: last_name,  
        email: "#{first_name}.#{last_name}@example.com", 
        password: PASSWORD 
    )  
end 

users = User.all 


25.times do
    random_date = Faker::Date.backward(days:365 * 5)
    a = Auction.create(
        title: Faker::Vehicle.make_and_model,
        description: Faker::Vehicle.standard_specs,
        ends_at: Faker::Date.forward(days: 60),
        reserve_price: rand(100_000),
        created_at: random_date,
        updated_at: random_date,
        user: users.sample
    )
    if a.valid?
        a.bids = rand(0..15).times.map do
            random_date = Faker::Date.backward(days:365 * 5)
            Bid.new(
                price: Faker::Number.within(range: 100..50000),
                created_at: random_date,
                updated_at: random_date,
                user: users.sample
            )
        end
    end
end



puts Cowsay.say("Created #{Auction.count} auctions.", :tux)
puts Cowsay.say("Created #{Bid.count} reviews", :koala)
puts Cowsay.say("Created #{users.count} users.", :cow)  