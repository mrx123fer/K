const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema, model}=mongoose;
const ObjectId = Schema.ObjectId; 
const path=require('path') 
const productoSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    category:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    idVendedor:{
        type:ObjectId,
        required:true,
        ref:'user'
    },
    stock:{
        type:Number,
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
    type:{//tipo de producto Mercado o tienda
        type:Number,
        required:true
    }
},
{
    datepublication:true
}); 
productoSchema.plugin(mongooseLeanVirtuals);
productoSchema.virtual('photoE').get(function() { 
    return this.photo.replace(path.extname(this.photo), "");
});
module.exports = mongoose.model('producto',productoSchema)