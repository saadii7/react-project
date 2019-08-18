// name,captain,sport,picture,discription
// Team Models

const mongoose = require('mongoose');
const _ = require('lodash');

const TeamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        captain: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        sport: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sport',
            required: true
        },
        image: {
            data: Buffer,
            contentType: String,
            name: String
        },
        description: {
            type: String
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        deletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Team = mongoose.model('team', TeamSchema);
module.exports = { Team };
