const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const {Schema}=mongoose;
const path=require('path') 
const userSchema = new Schema({ 
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    }, 
    description:{
        type:String,
        required:true
    }, 
    work:{
        type:String,
        required:false
    },
    ocupation:{
        type:String,
        required:false
    },
    user:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    direction:{
        country:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        municipality:{
            type:String,
            required:true
        }
    },
    birtday:{
        type:Date,
        required:true
    },
    emails:{
        type:Boolean,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },  
    validation:{
        type:Boolean,
        default:false,
        required:true
    },
    fechaRegistro:{
        type:Date,
        default:Date.now,
        required:true
    },
    facebook:{
        id:{
            type:String,
            required:false
        },
        name:{
            type:String,
            required:false
        },
        last_name:{
            type:String,
            required:false
        },
        email:{
            type:String,
            required:true
        },
        user_link:{
            type:String,
            required:true
        },
        photo:{
            type:String,
            required:false
        },
        status:{
            type:Boolean,
            required:false
        }

    }
}
); 
module.exports=mongoose.model('user',userSchema);
