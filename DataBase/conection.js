const mongoose = require('mongoose');
const { database }=require('../database/key.js')
mongoose.connect(database.URI) 
.then((db)=>{
    console.log('Esta conectado con la BD')
})
.catch((err)=>{
    console.log('Este es un error')
    console.log(err)
})