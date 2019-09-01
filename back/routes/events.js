const { Event } = require('../models/Event');
const { Team } = require('../models/Team');
const  PlayerRecord  = require('../models/PlayerRecord');
const  {Sport}  = require('../models/Sport');

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
    newEvent.maker = req.body.maker;
    newEvent.status = req.body.status;
    newEvent.duration = req.body.duration;

    newEvent.save().then(event => {
        res.status(200).send(event);
    }).catch(err => res.status(400).send(err))
});

router.post('/:id/manage-team', function (req, res) {
    // let y = {
    //     teamType : 'host',
    //     teamId : '',
    //     playerIds: [],

    // }
    //find event
    //check if players less than event.sport.count
    // update event based on teamType
    // set playerIds of event team in matchPlayerRecord
    let id = req.params.id;
    let teamType = req.body.teamType;
    let teamId = req.body.teamId;
    let playerIds = req.body.playerIds;
    Event.findById(id).then( async event => {
        if (!event) {
            return res.status(404).send({ message: 'Event not found' });
        }
        let isdel = event.isDeleted;
        if (isdel) {
            return res.status(404).send({ message: 'Event is Deleted.' })
        }else {
            let sport = await Sport.findById('5cd3c42e3cb56e195b26f70a');
            if (playerIds.length >= sport.minPlayerCount ){
                let changes = {};
                changes[teamType] = teamId;
                event.update(changes).then((event) => {
                    let dataSumbit = {teamId: teamId, eventId: id}
                    playerIds.forEach((playerId)=>{
                        dataSumbit.playerId = playerId;
                        //findORcreate
                        PlayerRecord.create(dataSumbit).then(pr => {
                            let notificationSubmit = {
                                from: session.userId,
                                to: pr.playerId,
                                data: {
                                    teamId: teamId, eventId: eventId
                                },
                                type: 'admission',
                                content: 'you are added in some team.'
                            }
                            console.log(notificationSubmit)
                            //notification create and send on sockit
                            Notification.create(notificationSubmit);
                        }).catch(err => res.status(400).send(err))
                    })

                }).catch((e) => {
                    res.status(400).send(e);
                });
            }else{
                return res.status(404).send({ message: 'Select more player bitch..' })
            }
        }
    }).catch(
    err => {
        res.status(400).send(err)
    });
});


router.post('/:id/check-team-players', (req, res) => {
    let id = req.params.id;
    let teamId = req.body.teamId; 
    Promise.all([
        Event.findById(id),
        Team.findById(teamId)
    ])
    .then(async result => {
        let event = result[0];
        let team = result[1];
        if (!event) {
            return res.status(404).send({ message: 'Event not found' });
        }
        let isdel = event.isDeleted;
        if (isdel) {
            return res.status(404).send({ message: 'Event is "Deleted".' })
        }else {
            let faultyPlayerIds = []
            // let eventIds = PlayerRecord.find(where: {playerId : team.users}).map(&:eventId)
            // let faultyEventIds = Event.find(where {id: eventIds, date < event.date && date > event.date + event.duration}).map(&:id)   
            // faultyPlayerIds = PlayerRecord.find(where: {eventId : faultyEventIds}).map(&:playerId) 
            let eventIds = await PlayerRecord.find( { playerId: { $in: team.users} }, {eventId: 0} )
            let endDate = new Date(event.date.getTime() + (event.duration)*60000);
            let faultyEventIds = await Event.find( { 
                _id: { $in: eventIds},
                date: { $gte: endDate },
                date: { $lte: event.date }
            }, {_id:0} )
            faultyPlayerIds = await PlayerRecord.find( { eventId: { $in: faultyEventIds} }, {playerId: 0} )
            return res.status(200).send(faultyPlayerIds);
        }
    })
});




///////////// Update Event

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

router.get('/:id/get', (req, res) => {
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