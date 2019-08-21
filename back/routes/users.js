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
const Sport = require('../models/Sport');
const { Notification } = require('../models/Notification');
const { Friendship } = require('../models/Friendship');

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
    Promise.all([
        Friendship.find({ reciever: id }),
        Friendship.find({ sender: id })
    ])
        .then(result => {
            let friendIds = _.union(
                result[0].map(instance => {
                    return instance.sender;
                }),
                result[1].map(instance => {
                    return instance.reciever;
                })
            );
            User.find(
                {
                    _id: {
                        $in: friendIds
                    }
                },
                function(err, friends) {
                    res.status(200).send(friends);
                }
            );
        })
        .catch(error => console.log(`Error in promises ${error}`));
});

router.post('/:id/add-friend', (req, res) => {
    const io = req.app.get('io');
    let userId = req.params.id;
    let notificationId = req.body.notificationId;

    let body = req.body;
    Notification.find({ from: body.friendId, to: userId })
        .then(note => {
            if (!note || note.length == 0) {
                return res
                    .status(404)
                    .send({ message: 'No Notification found for Friendship' });
            }
            let isdel = note.isDeleted;
            if (isdel)
                return res
                    .status(404)
                    .send({ message: 'notification is "Deleted".' });
            else {
                const friendship = new Friendship();
                friendship.reciever = userId;
                friendship.sender = body.friendId;
                Promise.all([
                    Notification.deleteMany({
                        from: body.friendId,
                        to: userId
                    }),
                    friendship.save(),
                    User.find({ id: body.friendId })
                    // Promise2
                ])
                    .then(result => {
                        io.emit('friends_for_' + userId, {
                            action: 'new',
                            data: result[3]
                        });
                        io.emit('notifications_for_' + userId, {
                            action: 'delete',
                            data: notificationId
                        });
                        res.status(200).send({ message: 'Friend added.' });
                    })
                    .catch(error => console.log(`Error in promises ${error}`));

                // return res.status(200).send(note);
            }
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post('/:id/delete-friend', (req, res) => {
    const io = req.app.get('io');
    let userId = req.params.id;
    let friendId = req.body.friendId;

    Promise.all([
        Friendship.deleteMany({
            reciever: friendId,
            sender: userId
        }),
        Friendship.deleteMany({
            sender: friendId,
            reciever: userId
        })
    ])
        .then(result => {
            res.status(200).send({ message: 'Friend deleted.' });
        })
        .catch(error => console.log(`Error in promises ${error}`));
});

module.exports = router;
