const { Schema, model } = require('mongoose');      
const commentSchema = new Schema({
    idUser:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }, 
    datepublication:{
        type:Date,
        default:Date.now
    }, 
    like:{
        type:Number,
        required:true,
        default:0
    },
    dontlike:{
        type:Number,
        required:true,
        default:0
    },
    idpublication:{
        type:String,
        required:true
    }
}
);  
module.exports = model('comment',commentSchema)