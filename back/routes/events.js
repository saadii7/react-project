const { Event } = require('../models/Event');
// const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const _ = require('lodash');

router.get('/all',(req,res)=>{
    let query = req.query || {}
    query.isDeleted = false;
    Event.find(query).then(events=>{
        if(!events) res.status(404).send({message:'No Event found'})
            res.status(200).send(events);
    }).catch(err=>res.status(400).send(err));
});

router.post('/create' /* , upload.single('eventImage')  */, function (req, res) {
    const newEvent = new Event;
    newEvent.date = req.body.date;
    newEvent.name = req.body.name;
    newEvent.location = req.body.location;
    newEvent.description = req.body.description;
    newEvent.sport = req.body.sport;
    newEvent.date = req.body.date;
    newEvent.maker = req.body.maker;
    newEvent.status = req.body.status;
    newEvent.duration = req.body.duration;
    newEvent.result = req.body.result;

    newEvent.save().then(event => {
        res.status(200).send(event);
    }).catch(err => res.status(400).send(err))
});

///////////// Update teh Event

router.put('/update/:id', (req, res) => {

    let id = req.params.id;
    var body = _.pick(req.body, ['date', 'eventName', 'location', 'maker', 'status', 'duration', 'description', 'result']);
    body.updatedAt=new Date().getTime();

    Event.findByIdAndUpdate(id, { $set: body }, { new: true }).then((event) => {
        if (!event) {
            res.status(404).send({ message: 'Event not found' });
        }
        res.status(200).send(event);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

/////////////////////// Delete Route
router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    let body = {id, isDeleted: true, deletedAt: new Date().getTime()};
    Event.findByIdAndUpdate(id, { $set: body }, { new: true }).then((user) => {
        if (!user) res.status(404).send({ message: 'Event not found' });
        res.status(200).send({ message: 'Successfuly Delete' });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

/////////////////////////// Get Route

router.get('/get/:id', (req, res) => {
    let id = req.params.id;
    Event.findById(id).then(event => {
        if (!event) {
            return res.status(404).send({ message: 'Event not found' });
        }
        let isdel = event.isDeleted;
        if (isdel) {
            return res.status(404).send({ message: 'Event is "Deleted".' })
        }else {
            return res.status(200).send(event);
        }
    }).catch(
    err => {
        res.status(400).send(err)
    });
});

module.exports = router;
