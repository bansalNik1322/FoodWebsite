// Step 3 - this is the code for ./models.js

var mongoose = require('mongoose');

var foodSchema = new mongoose.Schema({
    city: String,
    name: String,
    foodPlace: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

//Image is a model which has a schema imageSchema

const Food = new mongoose.model('Food', foodSchema);
module.exports = Food