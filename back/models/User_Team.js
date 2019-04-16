const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        // required: true,
    }],
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]

},
{
   timestamps: true
})

let User_Team = mongoose.model('User_Team', schema);
module.exports = { User_Team };