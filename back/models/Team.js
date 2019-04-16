// name,captain,sport,picture,discription
// Team Models

const mongoose = require('mongoose');
const _ = require('lodash');

const TeamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required:true,

    },
    captain: {
        type: String,
        required: true
    },
    teamImage: {
        data: Buffer, contentType: String, imageName: String
    },
    discription: {
        type: String,
    },
    isDeleted:{
    type: Boolean,
    default:false,
    },
    deletedAt:{
    type:Date,
    default:null,
    },
},
    {
        timestamps: true
    });

const Team = mongoose.model('team', TeamSchema);
module.exports = { Team };