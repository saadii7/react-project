const { Team } = require('../models/Team');
const { User_Team } = require('../models/User_Team');
const User = require('../models/User');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const _ = require('lodash');

router.get('/all',(req,res)=>{
    let query = req.query || {}
    query.isDeleted = false;
    Team.find(query).then(teams=>{
        if(!teams) res.status(404).send({message:'No Team found'})
            res.status(200).send(teams);
    }).catch(err=>res.status(400).send(err));
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
                    user.teams.push(user._id);
                    user.save();
                    team.users.push(team._id);
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
    const userteam = new User_Team();
    Team.findById(teamId).then(team => {
        if (!team) {
            res.status(404).send({ message: 'team not found' });
        } else {
            userteam.team.push(team._id);
            let query = { team_id: teamId };
            Team.find(query)
                .then(players => {
                    if (!players)
                        res.status(404).send({
                            message: 'No Players for this found'
                        });
                    res.status(200).send(players);
                })
                .catch(err => res.status(400).send(err));
        }
    });
});

router.post('/add-player', (req, res) => {
    const io = req.app.get('io');
    let teamid = req.body.teamId;
    let userid = req.body.userId;
    const userteam = new User_Team();
    Team.findById(teamid).then(team => {
        if (!team) {
            res.status(404).send({ message: 'team not found' });
        } else {
            userteam.team.push(team._id);
            User.findById(userid).then(user => {
                if (!user) res.status(404).send({ message: 'user not found' });
                io.emit('notifications_for_' + req.body.userid, {
                    action: 'new',
                    data: user
                });
                userteam.user.push(user._id);
                userteam
                    .save()
                    .then(abc => {
                        if (abc)
                            res.status(200).send({
                                message: 'successfull added'
                            });
                        res.status(400).send(abc);
                    })
                    .catch(err => res.status(400).send(err));
            });
        }
    });
});

router.post('/delete-player', (req, res) => {
    let teamid = req.body.teamId;
    let userid = req.body.userId;
    const userteam = new User_Team();
    Team.findById(teamid).then(team => {
        if (!team) {
            res.status(404).send({ message: 'team not found' });
        } else {
            userteam.team.push(team._id);
            User.findById(userid).then(user => {
                if (!user) res.status(404).send({ message: 'user not found' });
                userteam.user.push(user._id);
                userteam
                    .remove()
                    .then(abc => {
                        if (abc)
                            res.status(200).send({
                                message: 'successfull deleted'
                            });
                        res.status(400).send(abc);
                    })
                    .catch(err => res.status(400).send(err));
            });
        }
    });
});

module.exports = router;
