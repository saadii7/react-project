const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

router.post('/register', function (req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                userName: req.body.userName,
                avatar:req.body.avatar,
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                            .save()
                            .then(user => {
                                res.status(200).send(user);
                            }).catch(e => res.status(400).send(e));
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res, next) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
    .then((user,err) => {
        if (err) {
            return res.status(400).json({success: false});
        }
        if (user.isDeleted ==  true) {
            return res.status(400).json({success: false});
        }
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    }
                    jwt.sign(payload, 'secret', {
                        expiresIn: 3600
                    }, (err, token) => {
                        if (err) console.error('There is some error in token', err);
                        else {
                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            });
                        }
                    });
                });
            }
            else {
                errors.password = 'Incorrect Password';
                return res.status(400).json(errors);
            }
        });
    })
});


router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

// GET /logout
router.get('/logout', function(req, res, next) {
    if (req.session) {
        console.log('----------->>-------------------------',req.session);
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.status(200).json({message: 'Logged out'});
            }
        });
    }
});

module.exports = router;