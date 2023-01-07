const express = require('express');
const route  = express.Router();  
const post = require('../events/publications') 
module.exports = app=>{  
    route.get('/publications/:user',post.publications_user)
    route.get('/publication/:user/edit/:idPublication',post.edit_publication)
    route.get('/publication/privacity/:idPub/:type',post.privacity_);
    route.get('/edit_publication/:idPublication',post.edit_publication);
    route.post('/update_publication/:idPub',post.update_publication);
    route.get('/delete_publication/:idPub',post.delete_publication)
    app.use(route)
};