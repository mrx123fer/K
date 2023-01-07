const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema}=mongoose;
const path=require('path') 
const suscriberSchema = new Schema({ 
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    fechaRegistro:{
        type:Date,
        default:Date.now,
        required:true
    },
    telephone:{
        type:Number,
        required:true,
        unique:true
    },
    codePhone:{
        type:Number,
        required:true
    }
});
module.exports=mongoose.model('suscriber',suscriberSchema);
    