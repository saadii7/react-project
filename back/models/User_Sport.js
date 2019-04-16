const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    sport: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sport",
        required: 'Sport is required',
    }],
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            //required:true
        }
    ]

},
{
   timestamps: true
})

let User_Sport = mongoose.model('User_Sport', schema);
module.exports = { User_Sport };