const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema}=mongoose;
const path=require('path') 
const validationSchema = new Schema({ 
    idSuscriber:{
        type:String,
        required:true
    }, 
    codeEmail:{
        type:String,
        required:true
    },
    fechaRegistro:{
        type:Date,
        default:Date.now,
        required:true
    }
}
); 
module.exports=mongoose.model('validation',validationSchema);
