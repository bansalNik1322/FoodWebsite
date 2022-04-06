// Step 3 - this is the code for ./models.js

var mongoose = require('mongoose');

var festivalSchema = new mongoose.Schema({
    festIndex: String,
    festivalName: String,
    festDescription: String,
    festTime: String,
    festLocation: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

//Image is a model which has a schema imageSchema

const Festival = new mongoose.model('Festival', festivalSchema);
module.exports = Festival