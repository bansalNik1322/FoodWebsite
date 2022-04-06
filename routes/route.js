var express = require('express')
const https = require("https")

const resUpload = require("../middleware/middleware").resUpload;
const foodUpload = require("../middleware/middleware").foodUpload;
const placeUpload = require("../middleware/middleware").placeUpload;
const storyUpload = require("../middleware/middleware").storyUpload;
const festivalUpload = require("../middleware/middleware").festivalUpload;
const { ensureAuthenticated } = require('../config/auth');


var fs = require('fs');
var path = require('path');


const Restaurent = require("../model/restaurentModel")
const Food = require("../model/foodModel");
const Place = require("../model/placeModel");
const Story = require("../model/storyModel");
const Festival = require("../model/festivalModel");
const { delhiFoods, mumbaiFoods, goaFoods, chennaiFoods, kolkataFoods, jaipurFoods, lucknowFoods, hyderabadFoods, delhiRestaurents, goaRestaurents, mumbaiRestaurents, chennaiRestaurents, kolkataRestaurents, jaipurRestaurents, lucknowRestaurents, hyderabadRestaurents, delhiPlaces, goaPlaces, mumbaiPlaces, chennaiPlaces, kolkataPlaces, jaipurPlaces, lucknowPlaces, hyderabadPlaces, foodFestivals } = require('../data/data');

require('dotenv/config');

const router = express.Router();

router.get("/home",  ensureAuthenticated,  (req, res) => {
    res.render("home")
})

router.get('/cities', ensureAuthenticated,   (req, res) => {
    res.render('cityguide');
});

router.get('/foodfes',  ensureAuthenticated,   (req, res) => {
    Festival.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            res.render('festival', { items: items, festivalData: foodFestivals });
        }
    });
});

router.get('/stories',  ensureAuthenticated,   (req, res) => {
    Story.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            res.render('stories', { items: items });
        }
    });
});


router.get('/cities/:city',  ensureAuthenticated,   (req, res) => {

    var requestedCity = req.params.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${requestedCity}&appid=286e9ac11443ab820083b27c1c508748&units=metric`


    if (requestedCity == "jaipur") {
        https.get(url, function(response) {
            response.on("data", (data) => {
                const weatherData = JSON.parse(data)
                const temperature = weatherData.main.temp
                const weatherDesc = weatherData.weather[0].description
                res.render('jaipur', {
                    city: requestedCity,
                    temperature: temperature,
                    weatherDesc: weatherDesc
                });
            })
        })
    } else if (requestedCity == "delhi") {
        https.get(url, function(response) {
            response.on("data", (data) => {

                const weatherData = JSON.parse(data)
                const temperature = weatherData.main.temp
                const weatherDesc = weatherData.weather[0].description

                res.render('delhi', {
                    city: requestedCity,
                    temperature: temperature,
                    weatherDesc: weatherDesc
                });
            })
        })

    } else if (requestedCity == "chennai") {
        https.get(url, function(response) {
            response.on("data", (data) => {

                const weatherData = JSON.parse(data)
                const temperature = weatherData.main.temp
                const weatherDesc = weatherData.weather[0].description

                res.render('chennai', {
                    city: requestedCity,
                    temperature: temperature,
                    weatherDesc: weatherDesc
                });
            })
        })
    } else if (requestedCity == "goa") {
        https.get(url, function(response) {
            response.on("data", (data) => {

                const weatherData = JSON.parse(data)
                const temperature = weatherData.main.temp
                const weatherDesc = weatherData.weather[0].description

                res.render('goa', {
                    city: requestedCity,
                    temperature: temperature,
                    weatherDesc: weatherDesc
                });
            })
        })
    } else if (requestedCity == "hyderabad") {
        https.get(url, function(response) {
            response.on("data", (data) => {

                const weatherData = JSON.parse(data)
                const temperature = weatherData.main.temp
                const weatherDesc = weatherData.weather[0].description

                res.render('hyderabad', {
                    city: requestedCity,
                    temperature: temperature,
                    weatherDesc: weatherDesc
                });
            })
        })
    } else if (requestedCity == "kolkata") {
        https.get(url, function(response) {
            response.on("data", (data) => {

                const weatherData = JSON.parse(data)
                const temperature = weatherData.main.temp
                const weatherDesc = weatherData.weather[0].description

                res.render('kolkata', {
                    city: requestedCity,
                    temperature: temperature,
                    weatherDesc: weatherDesc
                });
            })
        })
    } else if (requestedCity == "lucknow") {
        https.get(url, function(response) {
            response.on("data", (data) => {

                const weatherData = JSON.parse(data)
                const temperature = weatherData.main.temp
                const weatherDesc = weatherData.weather[0].description

                res.render('lucknow', {
                    city: requestedCity,
                    temperature: temperature,
                    weatherDesc: weatherDesc
                });
            })
        })
    } else if (requestedCity == "mumbai") {
        https.get(url, function(response) {
            response.on("data", (data) => {

                const weatherData = JSON.parse(data)
                const temperature = weatherData.main.temp
                const weatherDesc = weatherData.weather[0].description

                res.render('mumbai', {
                    city: requestedCity,
                    temperature: temperature,
                    weatherDesc: weatherDesc
                });
            })
        })
    }
    console.log(requestedCity);

});


// Get request to get the restaurents---
router.get("/cities/:city/restaurent",  ensureAuthenticated,  (req, res) => {
    const requestedCity = req.params.city
    if (requestedCity == "delhi") {
        Restaurent.find({ 'city': 'delhi' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('restaurent', { city: requestedCity, items: items, restaurentData: delhiRestaurents, img: "/img/delhi.jpeg" });
            }
        });
    } else if (requestedCity == "goa") {
        Restaurent.find({ 'city': 'goa' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('restaurent', { city: requestedCity, items: items, restaurentData: goaRestaurents, img: "/img/goa.jpeg" });
            }
        });
    } else if (requestedCity == "mumbai") {
        Restaurent.find({ 'city': 'mumbai' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('restaurent', { city: requestedCity, items: items, restaurentData: mumbaiRestaurents, img: "/img/mumbai.jpeg" });
            }
        });
    } else if (requestedCity == "chennai") {
        Restaurent.find({ 'city': 'chennai' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('restaurent', { city: requestedCity, items: items, restaurentData: chennaiRestaurents, img: "/img/chennai.jpeg" });
            }
        });
    } else if (requestedCity == "kolkata") {
        Restaurent.find({ 'city': 'kolkata' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('restaurent', { city: requestedCity, items: items, restaurentData: kolkataRestaurents, img: "/img/KOLKATA.jpeg" });
            }
        });
    } else if (requestedCity == "jaipur") {
        Restaurent.find({ 'city': 'jaipur' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('restaurent', { city: requestedCity, items: items, restaurentData: jaipurRestaurents, img: "/img/jaipur.jpeg" });
            }
        });
    } else if (requestedCity == "lucknow") {
        Restaurent.find({ 'city': 'lucknow' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('restaurent', { city: requestedCity, items: items, restaurentData: lucknowRestaurents, img: "/img/lucknow.jpeg" });
            }
        });
    } else if (requestedCity == "hyderabad") {
        Restaurent.find({ 'city': 'hyderabad' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('restaurent', { city: requestedCity, items: items, restaurentData: hyderabadRestaurents, img: "/img/Hyderabad.jpeg" });
            }
        });
    }

    console.log(requestedCity);
})


// Get request to get the foods---
router.get("/cities/:city/foods",  ensureAuthenticated,   (req, res) => {
    const requestedCity = req.params.city;
    if (requestedCity == "delhi") {
        Food.find({ 'city': 'delhi' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('food', { city: requestedCity, items: items, foodData: delhiFoods, img: "/img/delhi.jpeg" });
            }
        });
    } else if (requestedCity == "goa") {
        Food.find({ 'city': 'goa' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('food', { city: requestedCity, items: items, foodData: goaFoods, img: "/img/goa.jpeg" });
            }
        });
    } else if (requestedCity == "mumbai") {
        Food.find({ 'city': 'mumbai' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('food', { city: requestedCity, items: items, foodData: mumbaiFoods, img: "/img/mumbai.jpeg" });
            }
        });
    } else if (requestedCity == "chennai") {
        Food.find({ 'city': 'chennai' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('food', { city: requestedCity, items: items, foodData: chennaiFoods, img: "/img/chennai.jpeg" });
            }
        });
    } else if (requestedCity == "kolkata") {
        Food.find({ 'city': 'kolkata' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('food', { city: requestedCity, items: items, foodData: kolkataFoods, img: "/img/KOLKATA.jpeg" });
            }
        });
    } else if (requestedCity == "jaipur") {
        Food.find({ 'city': 'jaipur' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('food', { city: requestedCity, items: items, foodData: jaipurFoods, img: "/img/jaipur.jpeg" });
            }
        });
    } else if (requestedCity == "lucknow") {
        Food.find({ 'city': 'lucknow' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('food', { city: requestedCity, items: items, foodData: lucknowFoods, img: "/img/lucknow.jpeg" });
            }
        });
    } else if (requestedCity == "hyderabad") {
        Food.find({ 'city': 'hyderabad' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('food', { city: requestedCity, items: items, foodData: hyderabadFoods, img: "/img/Hyderabad.jpeg" });
            }
        });
    }

})


// get request to get the places -- 
router.get("/cities/:city/places", ensureAuthenticated,   (req, res) => {
    const requestedCity = req.params.city;
    if (requestedCity == "delhi") {
        Place.find({ 'city': 'delhi' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('place', { city: requestedCity, items: items, placeData: delhiPlaces, img: "/img/delhi.jpeg" });
            }
        });
    } else if (requestedCity == "goa") {
        Place.find({ 'city': 'goa' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('place', { city: requestedCity, items: items, placeData: goaPlaces, img: "/img/goa.jpeg" });
            }
        });
    } else if (requestedCity == "mumbai") {
        Place.find({ 'city': 'mumbai' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('place', { city: requestedCity, items: items, placeData: mumbaiPlaces, img: "/img/mumbai.jpeg" });
            }
        });
    } else if (requestedCity == "chennai") {
        Place.find({ 'city': 'chennai' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('place', { city: requestedCity, items: items, placeData: chennaiPlaces, img: "/img/chennai.jpeg" });
            }
        });
    } else if (requestedCity == "kolkata") {
        Place.find({ 'city': 'kolkata' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('place', { city: requestedCity, items: items, placeData: kolkataPlaces, img: "/img/KOLKATA.jpeg" });
            }
        });
    } else if (requestedCity == "jaipur") {
        Place.find({ 'city': 'jaipur' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('place', { city: requestedCity, items: items, placeData: jaipurPlaces, img: "/img/jaipur.jpeg" });
            }
        });
    } else if (requestedCity == "lucknow") {
        Place.find({ 'city': 'lucknow' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('place', { city: requestedCity, items: items, placeData: lucknowPlaces, img: "/img/lucknow.jpeg" });
            }
        });
    } else if (requestedCity == "hyderabad") {
        Place.find({ 'city': 'hyderabad' }, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            } else {
                res.render('place', { city: requestedCity, items: items, placeData: hyderabadPlaces, img: "/img/Hyderabad.jpeg" });
            }
        });
    }

})

// Step 8 - the POST handler for processing the uploaded file

// Post request to add stories -- 
router.post("/stories", storyUpload.single('image'), (req, res) => {
    var obj = {
        userName: req.body.userName,
        restaurentName: req.body.restaurentName,
        about: req.body.about,
        img: {
            data: fs.readFileSync(path.join(__dirname, '..', '/uploads/stories', req.file.filename)),
            contentType: 'image/png '
        }
    }

    Story.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            // item.save();
            res.redirect("/stories");
        }
    });
})

router.post("/festivals", festivalUpload.single('image'), (req, res) => {
    var obj = {
        festivalName: req.body.festivalName,
        festDescription: req.body.festDescription,
        festTime: req.body.festTime,
        festLocation: req.body.festLocation,
        img: {
            data: fs.readFileSync(path.join(__dirname, '..', '/uploads/festivals', req.file.filename)),
            contentType: 'image/png'
        }
    }
    Festival.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            // item.save();
            res.redirect("/foodfes");
        }
    });
})

// post request to adding places according to respective city -- 
router.post('/cities/:city/places', placeUpload.single('image'), (req, res, next) => {

    const postCity = req.params.city
    var obj = {
        city: postCity,
        placeName: req.body.placeName,
        location: req.body.location,
        img: {
            data: fs.readFileSync(path.join(__dirname, '..', '/uploads/places', req.file.filename)),
            contentType: 'image/png'
        }
    }

    Place.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            // item.save();
            res.redirect(`/cities/${postCity}/places`);
        }
    });
});



// post request for adding foods according to respective city -- 
router.post('/cities/:city/food', foodUpload.single('image'), (req, res, next) => {

    const postCity = req.params.city
    var obj = {
        city: postCity,
        name: req.body.foodName,
        foodPlace: req.body.foodPlace,
        img: {
            data: fs.readFileSync(path.join(__dirname, '..', '/uploads/foods', req.file.filename)),
            contentType: 'image/png'
        }
    }

    Food.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            // item.save();
            res.redirect(`/cities/${postCity}/foods`);
        }
    });
});



// post request for adding restaurents according to respective city -- 
router.post('/cities/:city/restaurent', resUpload.single('image'), (req, res, next) => {

    const postCity = req.params.city
    var obj = {
        city: postCity,
        name: req.body.restaurentName,
        foodType: req.body.foodType,
        location: req.body.location,
        img: {
            data: fs.readFileSync(path.join(__dirname, '..', '/uploads/restaurents', req.file.filename)),
            contentType: 'image/png'
        }
    }

    Restaurent.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            // item.save();
            res.redirect(`/cities/${postCity}/restaurent`);
        }
    });
});



module.exports = router