const {TeamPosts}=require('../models/TeamPost');
// const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs=require('fs');
const _=require('lodash');

router.post('/create' /* , upload.single('eventImage')  */  , function(req, res){
    const teamposts = new TeamPosts;
    teamposts.message = req.body.message;
    teamposts.user = req.body.user;
    teamposts.team= req.body.team;
    teamposts.save().then(posts => {
        res.status(200).send(posts);
    }).catch(err => res.status(400).send(err))
});

///////////// Update teh Event

router.put('/update/:id',(req,res)=>{

    let id = req.params.id;
    var body = _.pick(req.body, ['status', 'to', 'from']);
    body.updatedAt=new Date().getTime();

    TeamPosts.findByIdAndUpdate(id, { $set: body }, { new: true }).then((post) => {
        if (!post) {
            res.status(404).send({ message: 'Post  not found' });
        }
        res.status(200).send(post);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

/////////////////////// Delete Route

router.delete('/delete/:id',(req,res)=>{

    let id=req.params.id;
    let body = {id, isDeleted: true, deletedAt: new Date().getTime()};
    TeamPosts.findByIdAndUpdate(id,{$set:body},{new:true}).then((note)=>{
        if(!note)  res.status(404).send({message:'Team Post not found'});
        res.status(200).send({message:'Successfuly Delete'});
    }).catch((e)=>{
        res.status(400).send(e);
    });

});

/////////////////////////// Get Route

router.get('/get/:id',(req,res)=>{
    let id=req.params.id;
    TeamPosts.findById(id).then(note=>{
        if(!note) {
            return res.status(404).send({message:'team post not found'});
        }
        let isdel=note.isDeleted;
        if(isdel) {
            return res.status(404).send({message:'post is "Deleted".'})
        }else{
            return res.status(200).send(note);
        }
    }).catch(
    err=>{  res.status(400).send(err)
    });
});

module.exports = router;
