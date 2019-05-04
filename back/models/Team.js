// name,captain,sport,picture,discription
// Team Models

const mongoose = require('mongoose');
const _ = require('lodash');

const TeamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    teamImage: {
        data: Buffer, contentType: String, imageName: String
    },
    description: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
},
{
    timestamps: true
});

const Team = mongoose.model('team', TeamSchema);
module.exports = { Team };
