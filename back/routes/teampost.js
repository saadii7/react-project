const {TeamPosts}=require('../models/TeamPost');
// const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs=require('fs');
const _=require('lodash');

//
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

  ////////////  Set Storage
  router.post('/add' /* , upload.single('eventImage')  */  , function(req, res){
    const teamposts = new TeamPosts;
    teamposts.message = req.body.message;
    teamposts.user = req.body.user;
    teamposts.team= req.body.team;

  // let buff = fs.readFileSync(req.file.path);
  // newEvent.teamImage.data = buff.toString('base64')
  //  newEvent.teamImage.contentType = req.file.mimetype;
  //  newEvent.teamImage.imageName = req.file.filename;
  ////////////////
  teamposts.save().then(posts => {
    res.status(200).send(posts);
  }).catch(err => res.status(400).send(err))


});

///////////// Update teh Event

router.put('/update/:id',(req,res)=>{

  let id = req.params.id;
  var body = _.pick(req.body, ['status', 'to', 'from']);
  // body.updatedAt=new Date().getTime();

  TeamPosts.findByIdAndUpdate(id, { $set: body }, { new: true }).then((post) => {
    //console.log('++++++++++++++',team);
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
      let body=_.pick(req.body,['deletedAt','isDeleted']);
      body.isDeleted=true;
      body.deletedAt=new Date().getTime();
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
                return res.status(404).send({message:'team post not found'});}

            let isdel=note.isDeleted;
            if(isdel) return res.status(404).send({message:'post is "Deleted".'})
            else{
                return res.status(200).send(note);
            }
        }).catch(
        err=>{  res.status(400).send(err)
          // console.log('++++++++++++',err)
        }

          );


      });




module.exports = router;
