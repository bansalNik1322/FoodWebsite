const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// User Model
const User = require("../model/userModel");
const { forwardAuthenticated } = require("../config/auth")

// Getting Login Page
router.get("/", forwardAuthenticated, (req, res) => {
    res.render("login")
})

// Getting Register Page
router.get("/register", forwardAuthenticated, (req, res) => {
    res.render("register")
})

router.post('/register', (req, res) => {
    const { firstName, lastName, userName, password } = req.body;
    let errors = [];

    if (!firstName || !lastName || !userName || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }



    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register');
    } else {
        User.findOne({ userName: userName }).then(user => {
            if (user) {
                errors.push({ msg: 'UserName already exists' });
                res.render('register');
            } else {
                const newUser = new User({
                    firstName,
                    lastName,
                    userName,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});
// Logout -- 
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});

module.exports = router;