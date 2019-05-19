const {Notification}=require('../models/Notification');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs=require('fs');
const _=require('lodash');

router.post('/create' /* , upload.single('eventImage')  */  , function(req, res){
    const newNotification = new Notification;
    newNotification.status = req.body.status;
    newNotification.to = req.body.to;
    newNotification.from = req.body.from;

    newNotification.save().then(event => {
        res.status(200).send(event);
    }).catch(err => res.status(400).send(err))
});

///////////// Update teh Event

router.put('/update/:id',(req,res)=>{

    let id = req.params.id;
    var body = _.pick(req.body, ['status', 'to', 'from']);
    body.updatedAt=new Date().getTime();

    Notification.findByIdAndUpdate(id, { $set: body }, { new: true }).then((notification) => {
        if (!notification) {
            res.status(404).send({ message: 'Notification not found' });
        }
        res.status(200).send(notification);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

/////////////////////// Delete Route

router.delete('/delete/:id',(req,res)=>{

    let id=req.params.id;
    let body = {id, isDeleted: true, deletedAt: new Date().getTime()};
    Notification.findByIdAndUpdate(id,{$set:body},{new:true}).then((note)=>{
        if(!note)  res.status(404).send({message:'Notification not found'});
        res.status(200).send({message:'Successfuly Delete'});
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

/////////////////////////// Get Route

router.get('/get/:id',(req,res)=>{
    let id=req.params.id;
    Notification.findById(id).then(note=>{
        if(!note) {
            return res.status(404).send({message:'notification not found'});
        }
        let isdel=note.isDeleted;
        if(isdel) return res.status(404).send({message:'notification is "Deleted".'})
        else{
          return res.status(200).send(note);
        }
    }).catch(
        err=>{  res.status(400).send(err)
    });
});

module.exports = router;
