const express = require('express');
const route  = express.Router();  
const comment = require('../events/comments') 
module.exports = app=>{  
    app.post('/publication/:idPublication/comment',comment.add_comment); 
    app.get('/koopus/publication/:idPublication',comment.publication)
    app.use(route)
};