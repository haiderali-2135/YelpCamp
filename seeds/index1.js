const mongoose = require('mongoose');
const Campground = require('../models/campgrounds');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 1000; i++) {
        const rand3000 = Math.floor(Math.random() * 3000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6506f07dd91301e84f7d9418',
            location: `${cities[rand3000].city}, ${cities[rand3000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quisquam molestiae nulla distinctio qui exercitationem quae nostrum modi aperiam, saepe ratione aut dolorum esse facilis a suscipit repellat illum nisi.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[rand3000].longitude,
                    cities[rand3000].latitude,
                ]
            },
            images: [{
                url: 'https://res.cloudinary.com/dvjtyfx3v/image/upload/v1695576564/YelpCamp/i0qnu0dxs0j8mzb9me7p.jpg',
                filename: 'YelpCamp/ecwx5jymri7izmbk0ltg',
            }]
        })
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})