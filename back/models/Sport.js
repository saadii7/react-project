///  Sport Model

const mongoose = require('mongoose');
const validator = require('validator');

const sportSchema = new mongoose.Schema({
    sportName: {
        type: String,
        required: true,
        unique: true
    },
    links: {
        type: String,
    },
    sportImage: {
        data: Buffer,
        contentType: String,
        imageName: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        //required:true
    }]
},
    {
        timestamps: true
    });

var Sport = mongoose.model('sport', sportSchema);
module.exports = { Sport };
