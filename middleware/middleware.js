var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

var fs = require('fs');
var path = require('path');
require('dotenv/config');


var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/restaurents')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var foodStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/foods')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});


var placeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/places')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var festivalStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/festivals')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var storyStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/stories')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var resUpload = multer({ storage: storage });
var foodUpload = multer({ storage: foodStorage });
var placeUpload = multer({ storage: placeStorage });
var festivalUpload = multer({ storage: festivalStorage });
var storyUpload = multer({ storage: storyStorage });

module.exports = { resUpload, foodUpload, placeUpload, festivalUpload, storyUpload }