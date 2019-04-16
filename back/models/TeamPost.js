const mongoose=require('mongoose');
const validator=require('validator');

const Schema=new mongoose.Schema({
message:{
type:String,
required:true,
},
user:{
type:String,
required:true
},
teamPostImage:{
  data:Buffer,
  contentType:String,
  imageName:String,

},
team:{
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

var TeamPosts=mongoose.model('TeamPosts',Schema);
module.exports={TeamPosts};
