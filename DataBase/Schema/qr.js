const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema, model}=mongoose;
const ObjectId = Schema.ObjectId; 
const path=require('path') 
const qrSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    qr:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    idUser:{
        type:String,
        required:true
    },
    datepublication:{
        type:Date,
        default:Date.now
    } 
});
module.exports = mongoose.model('qr',qrSchema)