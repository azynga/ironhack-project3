const router = require('express').Router();

// ℹ️ Handles password encryption
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require('../models/User.model');

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/loggedin', (req, res) => {
    // console.log(req);
    res.json(req.user);
});

router.post('/signup', isLoggedOut, (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        return res
            .status(400)
            .json({ errorMessage: 'Please provide your username.' });
    }

    if (password.length < 8) {
        return res.status(400).json({
            errorMessage:
                'Your password needs to be at least 8 characters long.',
        });
    }

    User.findOne({ username }).then((found) => {
        if (found) {
            return res
                .status(400)
                .json({ errorMessage: 'Username already taken.' });
        }

        return bcrypt
            .genSalt(saltRounds)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hashedPassword) => {
                return User.create({
                    username,
                    password: hashedPassword,
                });
            })
            .then((user) => {
                req.login(user, (error) => {
                    if (error) {
                        return res.status(500).json({
                            message: 'Error while attempting to login',
                        });
                    }

                    return res.status(201).json(user);
                });
            })
            .catch((error) => {
                if (error instanceof mongoose.Error.ValidationError) {
                    return res
                        .status(400)
                        .json({ errorMessage: error.message });
                }
                if (error.code === 11000) {
                    return res.status(400).json({
                        errorMessage:
                            'Username need to be unique. The username you chose is already in use.',
                    });
                }
                // console.log('username: ', username);
                // console.log('error: ', error);
                return res.status(500).json({ errorMessage: error.message });
            });
    });
});

router.post('/login', isLoggedOut, (req, res, next) => {
    passport.authenticate('local', (error, user) => {
        if (error) {
            return res
                .status(500)
                .json({ message: 'Error while authenticating' });
        }
        if (!user) {
            return res.status(400).json({ message: 'Wrong credentials' });
        }
        req.login(user, (error) => {
            if (error) {
                return res
                    .status(500)
                    .json({ message: 'Error while attempting to login' });
            }
            return res.status(200).json(user);
        });
    })(req, res);

    // const { username, password } = req.body;

    // if (!username) {
    //     return res
    //         .status(400)
    //         .json({ errorMessage: 'Please provide your username.' });
    // }

    // // Here we use the same logic as above
    // // - either length based parameters or we check the strength of a password
    // if (password.length < 8) {
    //     return res.status(400).json({
    //         errorMessage:
    //             'Your password needs to be at least 8 characters long.',
    //     });
    // }

    // // Search the database for a user with the username submitted in the form
    // User.findOne({ username })
    //     .then((user) => {
    //         // If the user isn't found, send the message that user provided wrong credentials
    //         if (!user) {
    //             return res
    //                 .status(400)
    //                 .json({ errorMessage: 'Wrong credentials.' });
    //         }

    //         // If user is found based on the username, check if the in putted password matches the one saved in the database
    //         bcrypt.compare(password, user.password).then((isSamePassword) => {
    //             if (!isSamePassword) {
    //                 return res
    //                     .status(400)
    //                     .json({ errorMessage: 'Wrong credentials.' });
    //             }
    //             req.session.user = user;
    //             // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
    //             return res.json(user);
    //         });
    //     })

    //     .catch((err) => {
    //         // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
    //         // you can just as easily run the res.status that is commented out below
    //         next(err);
    //         // return res.status(500).render("login", { errorMessage: err.message });
    //     });
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({ errorMessage: error.message });
        }
    });
    res.json({ message: 'Logged out' });
});

module.exports = router;
