const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema, model}=mongoose;
const ObjectId = Schema.ObjectId; 
const path=require('path') 
const noteSchema = new Schema({
    description:{
        type:String,
        required:true
    },
    pdf:{
        type:ObjectId
    },
    photo:{
        type:Object
    },
    idFriend:{
        type:ObjectId
    },
    idUser:{
        type:ObjectId,
        required:true
    },
    datepublication:{
        type:Date,
        default:Date.now
    },
    views:{
        type:Number,
        required:true,
        default:0
    },
    reaction:{
        type:ObjectId,
        required:true,
        default:0
    }
});
module.exports = mongoose.model('note',noteSchema)