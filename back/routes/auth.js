const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require("crypto");

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
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                userName: req.body.userName,
                avatar: req.body.avatar,
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
                                })
                                .catch(e => res.status(400).send(e));
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

    User.findOne({ email }).then((user, err) => {
        if (err) {
            return res.status(400).json({ success: false });
        }
        if (!user) {
            return res.status(400).json({ success: false });
        }
        if (user.isDeleted == true) {
            return res.status(400).json({ success: false });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    const payload = {
                        id: user.id,
                        name: user.name,
                        isAdmin: user.isAdmin,
                        avatar: user.avatar,
                    };
                    console.log('--AUth---------->', payload)
                    jwt.sign(
                        payload,
                        'secret',
                        {
                            expiresIn: 3600
                        },
                        (err, token) => {
                            if (err)
                                console.error(
                                    'There is some error in token',
                                    err
                                );
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        }
                    );
                });
            } else {
                errors.password = 'Incorrect Password';
                return res.status(400).json(errors);
            }
        });
    });
});

router.get(
    '/me',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        return res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    }
);
// forgot password
router.get('/forgot', function (req, res) {
    console.log('-----forgot------->>>',req.body.email)
    // res.render('forgot');
});

router.post('/forgot', function (req, res, next) {
    console.log('-----forgot------->>>',req.body.email)
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'ottis.gorczany@ethereal.email',
                    pass: 'yXFZaaHAeENWRT9uRe'
                }
            });
            var mailOptions = {
                to: 'asad4572@gmail.com',
                from: 'gameon_support@gmail.com',
                subject: 'GameOn Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                console.log('mail sent');
                req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/');
    });
});

router.get('/reset/:token', function (req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }
        res.render('reset', { token: req.params.token });
    });
});

router.post('/reset/:token', function (req, res) {
    async.waterfall([
        function (done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if (req.body.password === req.body.confirm) {
                    user.setPassword(req.body.password, function (err) {
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(function (err) {
                            req.logIn(user, function (err) {
                                done(err, user);
                            });
                        });
                    })
                } else {
                    req.flash("error", "Passwords do not match.");
                    return res.redirect('back');
                }
            });
        },
        function (user, done) {
            var smtpTransport = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'ottis.gorczany@ethereal.email',
                    pass: 'yXFZaaHAeENWRT9uRe'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'learntocodeinfo@mail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            }); 
        }
    ], function (err) {
        res.redirect('/');
    });
});
// GET /logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        console.log('----------->>-------------------------', req.session);
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.status(200).json({ message: 'Logged out' });
            }
        });
    }
});

module.exports = router;
