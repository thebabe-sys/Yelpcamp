
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random () * 1000);  
        const price = Math.floor(Math.random() * 20) + 10 
        const camp = new Campground ({
            author: '660e6619089dbf8a6a9246ac',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis praesentium consequuntur corporis cupiditate mollitia quam omnis dolor? Ipsum, sequi numquam",
            price,
            geometry: { type: 'Point', coordinates: [ cities[random1000].longitude, cities[random1000].latitude] },

            images: [
                {
                    url: 'https://res.cloudinary.com/dxcaulmn1/image/upload/v1712371790/YelpCamp/o77qnhaqx4f2rdyaembw.jpg',
                    filename: 'YelpCamp/o77qnhaqx4f2rdyaembw',
                  },
                  {
                    url: 'https://res.cloudinary.com/dxcaulmn1/image/upload/v1712371790/YelpCamp/bkguhslrdgtajgqxwyyp.jpg',
                    filename: 'YelpCamp/bkguhslrdgtajgqxwyyp',
                  },
                  {
                    url: 'https://res.cloudinary.com/dxcaulmn1/image/upload/v1712371790/YelpCamp/mvyuqumb2gn0pbp6culc.jpg',
                    filename: 'YelpCamp/mvyuqumb2gn0pbp6culc',
                  }
              
            ]
        })
        await camp.save();
    }
}

seedDb().then( () => {
    mongoose.connection.close()
})