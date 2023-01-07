const evt = {};
const {User,Suscriber, Validation, Product, History,Qr} = require('../DataBase/Schema');
const CryptoJS=require('crypto-js');
const qr = require("qrcode");
evt.generate_qr = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){
        res.render('qr_')
    }
}
evt.qr_generate = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){
        let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
        const user = await User.findOne({id:id})
        try{
    
            if(user){   
                qr.toDataURL(req.body.text, (err, src) => {
                    if (err) res.send("Error occured");   
                    if(src){ 
                        //
                        
                        //
                        saveComment(src,id,req.body.text,req.body.name)
                        //
                         
                    }
                    console.log('HaHa')
                }); 
                async function saveComment(src,id,text,name){
                    const qr={}
                    qr.qr=src,
                    qr.idUser=id,
                    qr.description=text,
                    qr.name=name;
                    console.log(qr)
                    const qr_ = await Qr.create(qr)
                    try{
                        res.json({status:true,myQr:src})
                    }catch(err){
                        console.log(err)
                    }
                }
            }else if(!user){
                console.log('err')
            }
        }catch(err){
            console.log(err)
        }
    }
}

evt.my_qr = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){
        let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
        const qr = await Qr.find({idUser:id})
        res.render('my_qr',{qr})
    }
}
evt.edit_qr = async (req,res)=>{
    let id=req.params.idQr 
    const qr = await Qr.findOne({_id:id})
    try{
        res.render('edit_qr',{qr})
    }
    catch(err){
        console.log(err)
    }
}
evt.edit_qr_update_generate = async (req,res)=>{ 
    qr.toDataURL(req.body.text, (err, src) => {
        if (err) res.send("Error occured");   
        if(src){ 
            //
            res.json({status:true,myQr:src})
            //
            //saveComment(src,id)
            //
             
        }
        console.log('HaHa')
    }); 
}
evt.edit_qr_update = async (req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    const _qr={}
    _qr.qr=req.body.code;
    _qr.idUser=id;
    _qr.description=req.body.text;
    _qr.name=req.body.name 
    console.log(req.body)
    console.log(_qr)
    console.log(req.params)
    const results = await Qr.findOneAndUpdate({_id:req.params.idQr,idUser:id},_qr) 
    try{ 
        console.log('Creado')
        res.json({status:true})
    }catch(err){
        console.log(err)
    } 
}
module.exports = evt;