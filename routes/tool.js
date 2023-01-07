const express = require('express');
const route  = express.Router();  
const tool = require('../events/tools') 
module.exports = app=>{     
    route.get('/tool/generate_qr',tool.generate_qr) 
    route.post('/tool/qr_generate',tool.qr_generate)
    route.get('/my_qr',tool.my_qr)
    route.get('/edit_qr/:idQr',tool.edit_qr) 
    route.post('/edit_qr/generate/:idQr',tool.edit_qr_update_generate)
    route.post('/edit_qr/update/:idQr',tool.edit_qr_update)
    app.use(route)
};