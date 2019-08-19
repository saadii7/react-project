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
        .then(teams => {
            if (!teams) res.status(404).send({ message: 'No Team found' });
            res.status(200).send(teams);
        })
        .catch(err => res.status(400).send(err));
});

// router.get('/all', (req, res) => {
//     let query = req.query || {};
//     query.isDeleted = false;
//     Team.find(query)
//         .then(sports => {
//             if (!sports) res.status(404).send({ message: 'No Sport found' });
//             res.status(200).send(sports);
//         })
//         .catch(err => res.status(400).send(err));
// });

router.post('/create' /*, upload.single('teamImage')*/, (req, res) => {
    const newTeam = new Team();
    newTeam.name = req.body.name;
    newTeam.captain = req.body.captain;
    newTeam.description = req.body.description;
    newTeam.sport = req.body.sport;
    newTeam.image.data = req.body.data;
    newTeam.image.contentType = req.body.contentType;
    newTeam.image.imageName = req.body.name;
    if (req.body.captain) {
        newTeam
            .save()
            .then(async team => {
                await User.findById(req.body.captain).then(user => {
                    if (user) {
                        user.teams.push(team);
                        user.save();
                        team.users.push(user);
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

/////////////

router.get('/:id/all-players', (req, res) => {
    let teamId = req.params.id;
    Team.findById(teamId).then(async team => {
        if (!team) {
            res.status(404).send({ message: 'team not found' });
        } else {
            let players = await User.find({ _id: { $in: team.users } });
            if (!players)
                res.status(404).send({
                    message: 'No Players for this found'
                });
            res.status(200).send(players);
        }
    });
});

router.post('/add-player', (req, res) => {
    const io = req.app.get('io');
    let teamid = req.body.teamId;
    let userid = req.body.userId;
    Promise.all([Team.findById(teamid), User.findById(userid)]).then(values => {
        let team = values[0];
        let user = values[1];
        if (!team) {
            res.status(404).send({ message: 'team not found' });
            return;
        }
        if (!user) {
            res.status(404).send({ message: 'user not found' });
            return;
        }
        user.teams.push(team._id);
        team.users.push(user._id);
        Promise.all([team.save(), user.save()]).then(resp => {
            io.emit('notifications_for_' + req.body.userid, {
                action: 'new',
                data: team
            });
            res.status(200).send({
                message: 'successfull added'
            });
        });
    });
});

router.post('/delete-player', (req, res) => {
    const io = req.app.get('io');
    let teamid = req.body.teamId;
    let userid = req.body.userId;
    Promise.all([Team.findById(teamid), User.findById(userid)]).then(values => {
        let team = values[0];
        let user = values[1];
        if (!team) {
            res.status(404).send({ message: 'team not found' });
            return;
        }
        if (!user) {
            res.status(404).send({ message: 'user not found' });
            return;
        }
        Promise.all([
            Team.update(
                { _id: team._id },
                { $pull: { users: { $in: [user._id] } } }
            ),
            User.update(
                { _id: user._id },
                { $pull: { teams: { $in: [team._id] } } }
            )
        ]).then(resp => {
            io.emit('notifications_for_' + req.body.userid, {
                action: 'delete',
                data: team
            });
            res.status(200).send({
                message: 'successfull deleted'
            });
        });
    });
});

module.exports = router;
