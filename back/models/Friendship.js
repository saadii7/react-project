const mongoose = require('mongoose');
const validator = require('validator');

const Schema = new mongoose.Schema(
    {
        ffrom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
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

var Friendship = mongoose.model('Friendship', Schema);
module.exports = { Friendship };
