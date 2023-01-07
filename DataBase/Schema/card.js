const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema}=mongoose;
const ObjectId = Schema.ObjectId;
const path=require('path') 
const cardSchema = new Schema({ 
    idUser:{
        type:ObjectId,
        required:true
    },number:{
        type:Number,
        required:true
    },
    rfc:{
        type:String,
        required:true
    },   
    password:{
        type:String,
        required:true
    } 
}
); 
module.exports=mongoose.model('card',cardSchema);
