const mongoose=require('mongoose');
const validator=require('validator');

const Schema=new mongoose.Schema({
status:{
type:String,
required:true,
},
from:{
type:String,
required:true
},
to:{
type:String,
required:true,
},
isDeleted:{
type: Boolean,
default:false,
},
deletedAt:{
type:Date,
default:null,
},

},
 {
    timestamps: true
});

var Notification=mongoose.model('Notification',Schema);
module.exports={Notification};