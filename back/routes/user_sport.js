const { User_Sport } = require('../models/User_Sport');
const { Sport } = require('../models/Sport');
const User = require('../models/User');
const express = require('express');
const router = express.Router();


router.post('/sportid/:sid/userid/:uid', (req, res) => {

    sportid = req.params.sid;
    userid = req.params.uid;
    const usersport = new User_Sport;

    //   const newSport = new Sport;

    Sport.findById(sportid).then(sport => {
        if (!sport) {
            res.status(404).send({ message: 'Sport not found' })
        }
        else {
            usersport.sport.push(sport._id);
            User.findById(userid).then(user => {
                if (!user) res.status(404).send({ message: 'user not found' });
                usersport.user.push(user._id);
                usersport.save().then(abc => {
                    if (abc) res.status(200).send({ message: 'successfull added' });
                    res.status(400).send(abc);
                }).catch(err => res.status(400).send(err));
            })
        }
    })


});

module.exports = router;