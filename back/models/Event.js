// Date,location,sport,name,status,duration,descriptoin ,result
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        location: {
            type: String
        },
        lat:{
            type:String
        },
        lng:{
            type:String
        },
        sport: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sport',
            required: true
        },
        avatar: {
            type: String
        },
        maker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            // required: true
        },
        opponent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        },
        name: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['active','cancel','complete'],
            default: 'active' 
        },
        duration: {
            type: Number,
        },
        description: {
            type: String
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date
        },
        result: {
            type: String,
            enum: ['maker', 'opponent', 'draw'],
        }
    },
    {
        strict: false,
        timestamps: true
    }
);

const Event = mongoose.model('Events', EventSchema);
module.exports = { Event };
