const mongoose = require('mongoose');
const validator = require('validator');

const Schema = new mongoose.Schema(
    {
        reciever: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

var Friendship = mongoose.model('friendship', Schema);
module.exports = { Friendship };
