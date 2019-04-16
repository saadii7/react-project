// Date,location,sport,name,status,duration,descriptoin ,result
const mongoose=require('mongoose');

const EventSchema=new mongoose.Schema({
    date:{
        type: Date,
      //  required:true,

    },
    location:{
        type:String,
    },
    sport:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Sport"
    },
    maker:{
      type:String,
      required:true,
    },
    eventName:{
        type:String,
        required:true,
    },
    status:{
         type:Boolean,
         default:false,
    },
    duration:{
      type: Date,
    },
    description:{
           type:String,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    deletedAt:{
          type: Date,

    },
    result:{
      type:String,
      enum:[true,false,'draw']
    }

},
{
   timestamps: true
});

const Events=mongoose.model('Events',EventSchema);
module.exports={Events};
