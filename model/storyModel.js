// Step 3 - this is the code for ./models.js

var mongoose = require('mongoose');

var storySchema = new mongoose.Schema({
    userName: String,
    restaurentName: String,
    about: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

//Image is a model which has a schema imageSchema

const Story = new mongoose.model('Story', storySchema);
module.exports = Story