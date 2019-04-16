const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const validator=require('validator');
const _=require('lodash');

const UserSchema=new Schema({
  name:{
    type:String,
    required:true

  },
  userName:{
     type:String,
     required:true,
     unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:'email is not valid',

    }
  },
  password:{
    type:String,
    required:true,
    minlength:6,
  },
  avatar:{
    type:String
  },
  date:{
    type:Date,
    default:Date.now
  },
  available:{
    type:Boolean,
    default:false,   
  },
  isDeleted:{
    type:Boolean,
    default:false,   
  },
  deletedAt:{
   type:Date,
  },
  privacy:{
   type:Boolean,
   default:false,
  },
  updatedAt:{
    type:Date,
    default:null,
  },
  sport: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sport",
    // required: 'Sport is required',
}]
});

UserSchema.methods.toJSON=function(){
  var user=this;
  var userObject=user.toObject();

  return _.pick(userObject,['_id','sports','name','email','userName','avatar','date','available','isDeleted','privacy','updatedAt']);
};

const User=mongoose.model('users',UserSchema);
module.exports=User;
