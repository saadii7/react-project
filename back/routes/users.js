// user.js
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const _ = require('lodash');

const User = require('../models/User');
const { Sport } = require('../models/Sport');

router.get('/all', (req, res) => {
    let query = req.query || {};
    query.isDeleted = false;
    console.log(query);
    User.find(query)
        .then(users => {
            if (!users) res.status(404).send({ message: 'No User found' });
            res.status(200).send(users);
        })
        .catch(err => res.status(400).send(err));
});

router.get('/get/:id', (req, res) => {
    let id = req.params.id;
    User.findById(id)
        .populate('Team')
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'user not found' });
            }
            let isdel = user.isDeleted;
            if (isdel)
                return res.status(404).send({ message: 'User is "Deleted".' });
            else {
                return res.status(200).send(user);
            }
        })
        .catch(err => res.status(400).send(err));
});

router.put('/update/:id', async (req, res) => {
    let id = req.params.id;
    var body = _.pick(req.body, [
        'name',
        'email',
        'avatar',
        's_name',
        'sport',
        'userName',
        'avatar',
        'isDeleted',
        'privacy',
        'available',
        'updatedAt'
    ]);
    body.updatedAt = new Date().getTime();
    // body.isDeleted = false;

    User.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(async user => {
            if (!user) {
                res.status(404).send({ message: 'user not found' });
            }
            await Sport.findOne({ name: req.body.name })
                .then(usr => {
                    user.sport.push(usr._id);
                    user.save().then(done =>
                        console.log('----------------------', done)
                    );
                    usr.user.push(user._id);
                    usr.save().then(done =>
                        console.log('+++++++++++++++++', done)
                    );
                })
                .catch(e =>
                    res.status(400).send({ message: 'error at sportname' })
                );
            res.status(200).send(user);
        })
        .catch(e => {
            res.status(400).send(e);
        });
});

router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['deletedAt', 'isDeleted']);
    body.isDeleted = true;
    body.deletedAt = new Date().getTime();
    User.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(user => {
            if (!user) res.status(404).send({ message: 'user not found' });
            res.status(200).send({ message: 'Successfuly Delete' });
        })
        .catch(e => {
            res.status(400).send(e);
        });
});

router.get('/:id/friends', (req, res) => {
    let id = req.params.id;
    console.log('-----------------', id);
    User.findById(id)
        .populate('Friendship')
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'user not found' });
            }
            let isdel = user.isDeleted;
            if (isdel)
                return res.status(404).send({ message: 'User is "Deleted".' });
            else {
                return res.status(200).send(user);
            }
        })
        .catch(err => res.status(400).send(err));
});

module.exports = router;
