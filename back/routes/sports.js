// Sport.js

const { Sport } = require('../models/Sport');
// const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const _ = require('lodash');

// router.post(
//     '/create',
//     /*upload.single('sportImage'),*/ async function(req, res) {
//         let sport = await Sport.findOne({ name: req.body.name });

//         if (!sport) {
//             console.log('-----------------', req.body, sport);
//             let newSport = new Sport();
//             newSport.name = req.body.name;
//             // newSport.image.data = req.body.data;
//             // newSport.image.contentType = req.body.contentType;
//             // newSport.image.name = req.body.name;
//             newSport.save().then(sprt => {
//                     res.status(200).send(sprt);
//                     return;
//                 })
//                 .catch(err => res.status(400).send(err));
//         } else {
//             Sport.findByIdAndUpdate(
//                 sport.id,
//                 { $set: { isDeleted: false, deletedAt: null } },
//                 { new: true }
//             )
//                 .then(sprt => {
//                     if (!sprt) {
//                         res.status(404).send({
//                             message: 'Sport not found'
//                         });
//                         return;
//                     }
//                     res.status(200).send(sprt);
//                     return;
//                 })
//                 .catch(e => {
//                     res.status(400).send(e);
//                 });
//         }
//     }
// );

router.post('/create',async (req,res)=>{
    let sport= await Sport.findOne({name:req.body.name});
    console.log('+++++++++++++++++');
    if(!sport)
    {
      let newSport=new Sport();
      newSport.name=req.body.name;
      newSport.save().then(sprt=>{
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>');
      res.status(200).send(sprt)
      }
      )
      .catch(err=>res.status(400).send(err))
    }
    else
    {
    res.status(200).send('sport already in database');
    }
});

router.put('/update/:id', (req, res) => {
    let id = req.params.id;
    var body = _.pick(req.body, [
        'name',
        'links',
        'data',
        'contentType',
        'fileName'
    ]);
    body.updatedAt = new Date().getTime();

    Sport.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(sprt => {
            if (!sprt) {
                res.status(404).send({ message: 'Sport not found' });
            }
            res.status(200).send(sprt);
        })
        .catch(e => {
            res.status(400).send(e);
        });
});
router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    let body = { id, isDeleted: true, deletedAt: new Date().getTime() };
    Sport.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(user => {
            if (!user) res.status(404).send({ message: 'sport not found' });
            res.status(200).send({ message: 'Successfuly Delete' });
        })
        .catch(e => {
            res.status(400).send(e);
        });
});

router.get('/all', (req, res) => {
    let query = req.query || {};
    query.isDeleted = false;
    Sport.find(query)
        .then(sports => {
            if (!sports) res.status(404).send({ message: 'No Sport found' });
            res.status(200).send(sports);
        })
        .catch(err => res.status(400).send(err));
});

router.get('/get/:id', (req, res) => {
    let id = req.params.id;
    Sport.findById(id)
        .then(sport => {
            if (!sport) {
                return res.status(404).send({ message: 'Sport not found' });
            }
            let isdel = sport.isDeleted;
            if (isdel) {
                return res.status(404).send({ message: 'Sport is "Deleted".' });
            } else {
                return res.status(200).send(sport);
            }
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;
