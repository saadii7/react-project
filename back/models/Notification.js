const mongoose = require('mongoose');
const validator = require('validator');

const Schema = new mongoose.Schema(
    {
        // status: {
        //     type: String,
        //     required: true
        // },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        type: {
            type: String,
            enum : ['friendship', 'admission','selection'],
            required: true
        },
        data:{
            type: JSON
        },
        seen: {
            type: Boolean,
            default: false
        },
        content: {
            type: String,
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

var Notification = mongoose.model('Notification', Schema);
module.exports = { Notification };
