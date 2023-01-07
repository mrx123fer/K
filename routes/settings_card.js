const express = require('express');
const route  = express.Router();  
const sett_card = require('../events/settings_card') 
module.exports = app=>{    
    route.get('/add_card',sett_card.add_card)
    route.post('/add_card_',sett_card.add_card_)
    route.get('/my_card',sett_card.my_card)
    route.post('/update_card',sett_card.update_card)
    app.use(route)
};