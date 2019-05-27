const { Team } = require('../models/Team');
const User = require('../models/User');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const _ = require('lodash');

router.get('/all', (req, res) => {
    let query = req.query || {};
    query.isDeleted = false;
    Team.find(query)
        .then(sports => {
            if (!sports) res.status(404).send({ message: 'No Sport found' });
            res.status(200).send(sports);
        })
        .catch(err => res.status(400).send(err));
});

router.post('/create' /*, upload.single('teamImage')*/, (req, res) => {
    const newTeam = new Team();
    newTeam.name = req.body.name;
    newTeam.captain = req.body.captain;
    newTeam.description = req.body.description;
    newTeam.image.data = req.body.data;
    newTeam.image.contentType = req.body.contentType;
    newTeam.image.imageName = req.body.name;
    if (req.body.captain) {
        newTeam
            .save()
            .then(async team => {
                await User.findById(req.body.captain).then(user => {
                    if (user) {
                        user.team.push(user._id);
                        user.save();
                        team.user.push(team._id);
                        team.save();
                    }
                });
                res.status(200).send(team);
            })
            .catch(err => res.status(400).send(err));
    } else {
        res.status(400).send({ message: 'Please Enter user' });
    }
});

router.put('/update/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'teamName',
        'captain',
        'description',
        'userId'
    ]);
    body.updatedAt = new Date().getTime();

    Team.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(async team => {
            if (!team) {
                res.status(404).send({ message: 'Team not found' });
            }
            await User.findById(req.body.userId)
                .then(user => {
                    if (user) {
                        user.team.push(user._id);
                        user.save().then(() => console.log('++++++++'));
                        team.user.push(team._id);
                        team.save().then(() =>
                            console.log('------------ done at team save')
                        );
                    }
                })
                .catch(() =>
                    res.status(400).send({ message: 'something went wrong ' })
                );
            res.status(200).send(team);
        })
        .catch(e => {
            res.status(400).send(e);
        });
});

router.get('/get/:id', (req, res) => {
    let id = req.params.id;
    Team.findById(id)
        .then(team => {
            if (!team) {
                return res.status(404).send({ message: 'Team not found' });
            }
            let isdel = team.isDeleted;
            if (isdel) {
                return res.status(404).send({ message: 'Team is "Deleted".' });
            } else {
                return res.status(200).send(team);
            }
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    let body = { id, isDeleted: true, deletedAt: new Date().getTime() };
    Team.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(team => {
            if (!team) res.status(404).send({ message: 'Team not found' });
            res.status(200).send({ message: 'Successfuly Delete' });
        })
        .catch(e => {
            res.status(400).send(e);
        });
});

module.exports = router;
