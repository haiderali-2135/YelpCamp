const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');


const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_100');
});

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: ['Number'],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, opts);

CampgroundSchema.virtual('properties.popupMarkup').get(function() {
    return this.title
});
CampgroundSchema.virtual('properties.popupId').get(function() {
    return this.id
});

CampgroundSchema.virtual('properties.popupDes').get(function() {
    return this.description.substring(0, 35)
});

CampgroundSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        console.log();
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);