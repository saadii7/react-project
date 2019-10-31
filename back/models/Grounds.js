// Date,location,sport,name,status,duration,descriptoin ,result
const mongoose = require('mongoose');

const GroundSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique:true
        },
        date: {
            type: Date,
            // required: true
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
            type:String,
        },
        avatar: {
            type: String
        }
        ,
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
    },
);

const Ground = mongoose.model('Grounds', GroundSchema);
module.exports = { Ground };
