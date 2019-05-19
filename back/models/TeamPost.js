const mongoose = require('mongoose');
const validator = require('validator');

const Schema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,
        imageName: String,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
},
{
    timestamps: true
});

var TeamPosts = mongoose.model('TeamPosts', Schema);
module.exports = { TeamPosts };
