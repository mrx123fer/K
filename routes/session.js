const express = require('express');
const route  = express.Router(); 
const session_ = require('../events/sessions') 
module.exports = app=>{ 
    route.get('/login',session_.login_render)
    route.post('/login_validation',session_.login_validation)
    route.get('/log_out',session_.log_out)
    route.get('/register',session_.register_render)
    route.post('/connect_facebook_api',session_.connect_facebook_api)
    route.get('/verify_my_account',session_.verify_my_account) 
    route.post('/validation_account',session_.validation_account)
    app.use(route)
};