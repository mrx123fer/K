const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema, model}=mongoose;  
const path=require('path') 
const user = mongoose.model('user');
const publicationSchema = new Schema({
    description:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:false
    }, 
    category:{//Categoria del producto o servicio
        type:Number,
        required:false
    },
    ubication:{
        type:String,
        required:false
    },
    name:{//nombre del producto o servicio
        type:String,
        required:false
    },
    idUser:{
        type: Schema.ObjectId,
        ref: 'user',
    },
    stock:{
        type:Number,
        required:false
    },
    datepublication:{
        type:Date,
        default:Date.now,
        required:true
    },
    views:{
        type:Number,
        required:true,
        default:0
    },
    reaction:{ 
        like:{ 
            default:0,
            type:Number, 
            require: false
        },
        dontlike:{ 
            default:0,
            type:Number, 
            require: false
        },
        recommend:{ 
            default:0,
            type:Object, 
            require: false
        }
    },
    archive:{
        archives:[
            {
                type:Object,
                required:false
            }
        ],
        pdf:[
            {
                type:Object,
                required:false
            }
        ],
        images:[
            {
                type:Object,
                required:false
            }
        ]
    },
    type:{//Producto, Servicio, Publicacion
        type:Number,
        required:true
    },
    privacity:{
        public:{
            type:Boolean,
            required:false,
            default:false
        },
        my_public:{
            type:Boolean,
            required:false,
            default:false
        },
        private:{
            type:Boolean,
            required:false,
            default:false
        }
    }
},
{
    datepublication:true
});  
module.exports = mongoose.model('publication_delete',publicationSchema)