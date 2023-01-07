const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema, model}=mongoose;
const ObjectId = Schema.ObjectId; 
const path=require('path') 
const locationSchema = new Schema({
    country:{
        type:String
    },
    state:{
        type:String
    },
    municipaly:{
        type:String
    }
});
module.exports = mongoose.model('location',locationSchema)