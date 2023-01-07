const evt = {};
const {User,Suscriber, Validation, Card} = require('../DataBase/Schema');
const CryptoJS=require('crypto-js')
evt.add_card = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8);
        const card = await Card.findOne({idUser:id}) 
        try{
            if(!card){
                res.render('form_card')
            }else if(card){ 
                res.redirect('/my_card')
            }
        }
        catch(err){
            console.log(err)
        }
    }
}
evt.add_card_ = async (req,res)=>{  
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8);
    let pass=CryptoJS.AES.encrypt(req.body.security_password,'NYfF5cgbQCDn1gyXPt7Hj51Xmu4E69uR1Pvn2qlpjfDUyGO').toString()
    const card = {
            idUser:id,
            number:req.body.card_number,
            rfc:req.body.rfc,
            password:pass
        }
    const car = await Card.create(card)
    try{
        res.redirect('/my_card')
    } 
    catch(err){
        console.log(err)
    }
}
evt.my_card = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8);
        const card = await Card.findOne({idUser:id})
        try{
            card.password=CryptoJS.AES.decrypt(decodeURIComponent(card.password), 'NYfF5cgbQCDn1gyXPt7Hj51Xmu4E69uR1Pvn2qlpjfDUyGO').toString(CryptoJS.enc.Utf8);
            res.render('my_card',{card})
        } 
        catch(err){
            console.log(err)
        }
    }
}
evt.update_card = async (req,res)=>{
    console.log(req.body)
}
module.exports = evt;