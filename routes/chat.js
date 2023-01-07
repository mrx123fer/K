const express = require('express');
const route  = express.Router();  
const chat = require('../events/chat') 
module.exports = app=>{   
    route.get('/chat/:user/',chat.index)
    app.use(route)
};