// Step 3 - this is the code for ./models.js

var mongoose = require('mongoose');

var placeSchema = new mongoose.Schema({
    city: String,
    placeName: String,
    location: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

//Image is a model which has a schema imageSchema

const Place = new mongoose.model('Place', placeSchema);
module.exports = Place