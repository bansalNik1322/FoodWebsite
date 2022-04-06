// This is going to be our main file -- 
// Step 1 - importing modules -- 

var express = require('express')
var app = express()
var bodyParser = require('body-parser');
require('dotenv/config');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

// Step 2 - connect to the database

connectDB = require("./db/connection")
connectDB()

require('./config/passport')(passport);

// Step 3 - set up EJS and oter middlewares

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static("public"));

app.set("view engine", "ejs");
// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



// Getting Routes for te app -- 

const router = require("./routes/route")
app.use("/", router)
app.use("/", require("./routes/user"))

// Step 9 - configure the server's port
var port = process.env.port || '3000'
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})