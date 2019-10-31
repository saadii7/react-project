const { Ground } = require('../models/Grounds');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const _ = require('lodash');

router.post('/create',async (req,res)=>{
  let ground= await Ground.findOne({name:req.body.name});
  if(!ground)
  {
    let newGround=new Ground();
    newGround.date = req.body.date;
    newGround.name = req.body.name;
    newGround.location = req.body.location;
    newGround.description = req.body.description;
    newGround.lat = req.body.lat;
    newGround.lng = req.body.lng;
    newGround.sport = req.body.sport;
    newGround.avatar= req.body.avatar;
    newGround.save().then(grnd=>{
    res.status(200).send(grnd)
    }
    )
    .catch(err=>res.status(400).send(err))
  }
  else
  {
  res.status(200).send('Ground already in database');
  }
});

router.get('/all', (req, res) => {
    let query = req.query || {}
    query.isDeleted = false;
    Ground.find(query).then(events => {
        if (!events) res.status(404).send({ message: 'No Ground found' })
        res.status(200).send(events);
    }).catch(err => res.status(400).send(err));
});


    ///////////// Update Ground

    router.put('/update/:id', (req, res) => {
        let id = req.params.id;
        var body = _.pick(req.body, ['date', 'name', 'location', 'description', 'avatar']);
        body.updatedAt = new Date().getTime();
        Ground.findByIdAndUpdate(id, { $set: body }, { new: true }).then((Ground) => {
            if (!Ground) {
                res.status(404).send({ message: 'Ground not found' });
            }
            res.status(200).send(Ground);
        }).catch((e) => {
            res.status(400).send(e);
        });
    });

    /////////////////////// Delete Route
    router.delete('/delete/:id', (req, res) => {
        let id = req.params.id;
        let body = { id, isDeleted: true, deletedAt: new Date().getTime() };
        Ground.findByIdAndUpdate(id, { $set: body }, { new: true }).then((user) => {
            if (!user) res.status(404).send({ message: 'Ground not found' });
            res.status(200).send({ message: 'Successfuly Delete' });
        }).catch((e) => {
            res.status(400).send(e);
        });
    });

    /////////////////////////// Get Route

    router.get('/:id/get', (req, res) => {
        let id = req.params.id;
        Ground.findById(id).then(Ground => {
            if (!Ground) {
                return res.status(404).send({ message: 'Ground not found' });
            }
            let isdel = Ground.isDeleted;
            if (isdel) {
                return res.status(404).send({ message: 'Ground is "Deleted".' })
            } else {
                return res.status(200).send(Ground);
            }
        }).catch(
            err => {
                res.status(400).send(err)
            });
    });

    module.exports = router;