const express = require('express');
const route  = express.Router();  
const academy = require('../events/academy') 
module.exports = app=>{   
    //
    route.post('/academy/create_publication',academy.create_publication)
    app.use(route)
};