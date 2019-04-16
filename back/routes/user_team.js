const { User_Team } = require('../models/User_Team');
const { Team } = require('../models/Team');
const User = require('../models/User');
const express = require('express');
const router = express.Router();


router.post('/teamid/:tid/userid/:uid', (req, res) => {

    let teamid = req.params.tid;
    let userid = req.params.uid;
    const userteam = new User_Team;

    //   const newSport = new Sport;

    Team.findById(teamid).then(team => {
        if (!team) {
            res.status(404).send({ message: 'team not found' })
        }
        else {
            userteam.team.push(team._id);
            User.findById(userid).then(user => {
                if (!user) res.status(404).send({ message: 'user not found' });
                userteam.user.push(user._id);
                userteam.save().then(abc => {
                    if (abc) res.status(200).send({ message: 'successfull added' });
                    res.status(400).send(abc);
                }).catch(err => res.status(400).send(err));
            })
        }
    })


});

module.exports = router;