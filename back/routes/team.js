const { Team } = require('../models/Team');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const _ = require('lodash');
//
// // Set Storage
//
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// })
//
// var upload = multer({ storage: storage })

router.post('/add'/*, upload.single('teamImage')*/, (req, res) => {
  // console.log(req.file);

  const newTeam = new Team;
  newTeam.teamName = req.body.teamName;
  newTeam.captain = req.body.captain;
  newTeam.discription = req.body.discription;
  // let buff = fs.readFileSync(req.file.path);
  newTeam.teamImage.data = req.body.data;
  newTeam.teamImage.contentType = req.body.contentType;
  newTeam.teamImage.imageName = req.body.imageName;
  ////////////////
  newTeam.save().then(team => {
    res.status(200).send(team);
  }).catch(err => res.status(400).send(err))

});
router.put('/update/:id', (req, res) => {
  let id = req.params.id;
  var body = _.pick(req.body, ['teamName', 'captain', 'description']);
  // body.updatedAt=new Date().getTime();

  Team.findByIdAndUpdate(id, { $set: body }, { new: true }).then((team) => {
    //console.log('++++++++++++++',team);
    if (!team) {
      res.status(404).send({ message: 'Team not found' });
    }
    res.status(200).send(team);
  }).catch((e) => {
    res.status(400).send(e);
  });

});
router.get('/get/:id', (req, res) => {
  let id = req.params.id;
  Team.findById(id).then(team => {
    if (!team) {
      // console.log('----------------',team);
      return res.status(404).send({ message: 'Team not found' });
    }
    let isdel = team.isDeleted;
    if (isdel) return res.status(404).send({ message: 'Team is "Deleted".' })
    else {
      return res.status(200).send(team);
    }
  }).catch(
    err => {
      res.status(400).send(err)
      // console.log('++++++++++++',err)
    }

  );
});
router.delete('/delete/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['deletedAt', 'isDeleted']);
  body.isDeleted = true;
  body.deletedAt = new Date().getTime();
  Team.findByIdAndUpdate(id, { $set: body }, { new: true }).then((team) => {
    if (!team) res.status(404).send({ message: 'Team not found' });
    res.status(200).send({ message: 'Successfuly Delete' });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

module.exports = router;
