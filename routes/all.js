const express = require('express');
const route  = express.Router();  
const all = require('../events/all') 
module.exports = app=>{  
    route.get('/',all.academy)
    route.get('/look',all.look)
    //Account user  
    route.get('/account_settings',all.account_setting_r)
    route.get('/my_shopping',all.my_shopping)
    route.get('/my_history',all.my_history)
    route.get('/help',all.help)
    route.get('/about',all.about)
    route.get('/profile/:user/:idUser',all.profile) 
    route.get('/my_profile/:user',all.my_profile)
    route.get('/academy',all.academy)
    route.post('/search_friend',all.search_friend)
    route.get('/act_bd',all.act_bd)
    app.use(route)
};