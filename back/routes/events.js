const {Events}=require('../models/Events');
// const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs=require('fs');
const _=require('lodash');


// /// Set Storage
//
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, new Date().toISOString()+file.originalname);
//     }
//   })
//
//   var upload = multer({ storage: storage })
//
//   ////////////  Set Storage

  router.post('/add' /* , upload.single('eventImage')  */  , function(req, res){
    const newEvent = new Events;
    newEvent.date=req.body.date;
  newEvent.eventName = req.body.eventName;
  newEvent.location = req.body.location;
  newEvent.discription = req.body.discription;
  newEvent.date =req.body.date;
  newEvent.maker=req.body.maker;
  newEvent.status=req.body.status;
  newEvent.duration=req.body.duration;
  newEvent.result=req.body.result;



  // let buff = fs.readFileSync(req.file.path);
  // newEvent.teamImage.data = buff.toString('base64')
  //  newEvent.teamImage.contentType = req.file.mimetype;
  //  newEvent.teamImage.imageName = req.file.filename;
  ////////////////
  newEvent.save().then(event => {
    res.status(200).send(event);
  }).catch(err => res.status(400).send(err))


});

///////////// Update teh Event

router.put('/update/:id',(req,res)=>{

  let id = req.params.id;
  var body = _.pick(req.body, ['date','eventName', 'location', 'maker','status','duration','description','result']);
  // body.updatedAt=new Date().getTime();

  Events.findByIdAndUpdate(id, { $set: body }, { new: true }).then((event) => {
    //console.log('++++++++++++++',team);
    if (!event) {
      res.status(404).send({ message: 'Event not found' });
    }
    res.status(200).send(event);
  }).catch((e) => {
    res.status(400).send(e);
  });




    });

    /////////////////////// Delete Route

    router.delete('/delete/:id',(req,res)=>{

      let id=req.params.id;
      let body=_.pick(req.body,['deletedAt','isDeleted']);
      body.isDeleted=true;
      body.deletedAt=new Date().getTime();
      Events.findByIdAndUpdate(id,{$set:body},{new:true}).then((user)=>{
        if(!user)  res.status(404).send({message:'Event not found'});
        res.status(200).send({message:'Successfuly Delete'});
          }).catch((e)=>{
            res.status(400).send(e);
          });

      });

      /////////////////////////// Get Route

      router.get('/get/:id',(req,res)=>{
        let id=req.params.id;
        Events.findById(id).then(event=>{
            if(!event) {
                return res.status(404).send({message:'Event not found'});}

            let isdel=event.isDeleted;
            if(isdel) return res.status(404).send({message:'Event is "Deleted".'})
            else{
                return res.status(200).send(event);
            }
        }).catch(
        err=>{  res.status(400).send(err)
          // console.log('++++++++++++',err)
        }

          );


      });




module.exports = router;
