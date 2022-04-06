// Step 3 - this is the code for ./models.js

var mongoose = require('mongoose');

var restaurentSChema = new mongoose.Schema({
    city: String,
    name: String,
    foodType: String,
    location: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

//Image is a model which has a schema imageSchema

const Restaurent = new mongoose.model('Restaurent', restaurentSChema);
module.exports = Restaurent