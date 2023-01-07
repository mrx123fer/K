const evt = {};
const {User,Suscriber, Validation, Product, History, Publication} = require('../DataBase/Schema');
const CryptoJS=require('crypto-js') 

evt.index = async (req,res)=>{ 
    res.render('chat',{layout:''})
}
module.exports = evt;