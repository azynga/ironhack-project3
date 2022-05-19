const router = require('express').Router();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');

const saltRounds = 10;

const User = require('../models/User.model');

const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/loggedin', (req, res) => {
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
