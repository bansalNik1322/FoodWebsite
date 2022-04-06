var mongoose = require('mongoose')
require('dotenv/config');
const connectDB = () => {

    mongoose.connect(process.env.MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true }, err => {
            console.log('connected')
        });
}

module.exports = connectDB