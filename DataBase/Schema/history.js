const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema}=mongoose; 
const ObjectId = Schema.ObjectId;
const path=require('path') 
const historySchema = new Schema({ 
    idUser:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    dataRegister:{
        type:Date,
        default:Date.now,
        required:true
    }
}
); 
module.exports=mongoose.model('history',historySchema);
