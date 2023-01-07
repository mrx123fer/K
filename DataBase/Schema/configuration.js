const mongoose = require('mongoose'); 
const {Schema, model}=mongoose;
const ObjectId = Schema.ObjectId;  
const configurationSchema = new Schema({
    idVendedor:{
        type:ObjectId,
        required:true
    },
    age:{
        type:Boolean,
        required:true
    },
    dataAge:{
        type:Boolean,
        required:true
    },
    comment:{
        type:Boolean,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
});
module.exports = model('configuration',configurationSchema)