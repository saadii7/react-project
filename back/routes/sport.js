// Sport.js

const {Sport}=require('../models/Sport');
// const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs=require('fs');
const _=require('lodash');


/// Set Storage
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

router.post('/add',/*upload.single('sportImage'),*/ function(req, res){
    // console.log(req.file);
    const newSport = new Sport;
        newSport.sportName=req.body.sportName;
         // newSport.links=req.body.links;
         // let buff=fs.readFileSync(req.file.path);
         newSport.sportImage.data=req.body.data;
         newSport.sportImage.contentType=req.body.contentType;
         newSport.sportImage.imageName=req.body.ImageName;



//    let buff = fs.readFileSync('stack-abuse-logo.png');
//      let base64data = buff.toString('base64');

         ////////////////
         newSport.save().then(sprt=>{
             res.status(200).send(sprt);
         }).catch(err=> res.status(400).send(err))

});


router.put('/update/:id',(req,res)=>{
    let id=req.params.id;
    var body=_.pick(req.body,['sportName','links','data','contentType','fileName']);
        // body.updatedAt=new Date().getTime();

        Sport.findByIdAndUpdate(id,{$set:body},{new:true}).then((sprt)=>{
            if(!sprt){
              res.status(404).send({message:'Sport not found'});
            }
            res.status(200).send(sprt);
          }).catch((e)=>{
            res.status(400).send(e);
          });

    });
    router.delete('/delete/:id',(req,res)=>{
      let id=req.params.id;
      let body=_.pick(req.body,['deletedAt','isDeleted']);
      body.isDeleted=true;
      body.deletedAt=new Date().getTime();
      Sport.findByIdAndUpdate(id,{$set:body},{new:true}).then((user)=>{
        if(!user)  res.status(404).send({message:'sport not found'});
        res.status(200).send({message:'Successfuly Delete'});
          }).catch((e)=>{
            res.status(400).send(e);
          });
      });

router.get('/getAll',(req,res)=>{
  Sport.find({isDeleted:false}).then(sport=>{
    if(!sport) res.status(404).send({message:'sport not found'})
    res.status(200).send(sport);
  }).catch(err=>res.status(400).send(err));
});

router.get('/get/:id',(req,res)=>{
  let id=req.params.id;
  Sport.findById(id).then(sport=>{
      if(!sport) {
          console.log('----------------',sport);
          return res.status(404).send({message:'Sport not found'});}
      let isdel=sport.isDeleted;
      if(isdel) return res.status(404).send({message:'Sport is "Deleted".'})
      else{
          return res.status(200).send(sport);
      }
  }).catch(
  err=>{  res.status(400).send(err)
    // console.log('++++++++++++',err)
  }

    );
})



module.exports = router;
