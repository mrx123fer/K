const evt = {};
const {User,Suscriber, Validation} = require('../DataBase/Schema');
const CryptoJS=require('crypto-js')
const fs = require('fs-extra')
const looksSame = require('looks-same');
evt.register_render = async (req,res)=>{
    res.render('register',{layout:'encabezado'})
}
evt.connect_facebook_api = async (req,res)=>{
    console.log(req.body)
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    const user = await User.findOne({_id:id})
    try{
        if(user){
            user.facebook.id=req.body.id
            user.facebook.name=req.body.name
            user.facebook.last_name=req.body.lastName
            user.facebook.photo=req.body.photo
            user.facebook.email=req.body.email
            user.facebook.user_link=req.body.link
            user.facebook.status=true
            User.findOneAndUpdate({_id:id},user)
            .then(()=>{
                res.redirect('/my_profile/'+req.session.user)
            })
            console.log(user)
        }else if(!user){

        }
    }
    catch(err){

    }
}
evt.login_render = async (req,res)=>{
    res.render('login',{layout:'encabezado'})
}
evt.login_validation = async (req,res)=>{   
    const us = await User.findOne({ $or: [ {email:req.body.email}, {user:req.body.email}] })
    try{ 
        if(us){ 
            let pass=CryptoJS.AES.decrypt(us.password, 'PE26lreCr8ZUD7g2g5vnfcDoVYOArZ1na2HmB6Hsp4Nr5SAdKu').toString(CryptoJS.enc.Utf8)
          
            if(req.body.password==pass){ 
                let idd=encodeURIComponent(CryptoJS.AES.encrypt(us.id,'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString())
                 
                req.session.idUsu=idd 
                req.session.name=us.name
                req.session.lastnames=us.lastname
                req.session.user=us.user
                req.session.email=us.email
                console.log(req.session.lastnames)
                res.redirect('/')
            }else{
                res.redirect('/login')
            }
        }else if(!us){
            console.log('Usuario invalido')
        }
    }
    catch(err){
        console.log('ERROR--------ERROR------ERROR')
        console.log(err)
    }
}
evt.verify_my_account = async (req,res)=>{
    res.render('verify_account')
}
evt.validation_account = async (req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    const credential = req.files.image1
    const comparation = req.files.image2
    let user = req.session.user
    const resUser = fs.existsSync(`./public/data_files_/${user}/Validations`) 
    if(resUser==true){
        credential.mv(`./public/data_files_/${user}/Validations/${credential.name}`,err => {
            if(err){
                console.log(err) 
            }
        })            
        comparation.mv(`./public/data_files_/${user}/Validations/${comparation.name}`,err => {
            if(err){
                console.log(err) 
            }
        }) 
        const credentialComp = `./public/data_files_/${user}/Validations/${credential.name}`
        const photoComp = `./public/data_files_/${user}/Validations/${comparation.name}`
        looksSame( credentialComp,  photoComp)
        .then((dat)=>{
            if(dat.equal==true){ 
                User.findOneAndUpdate({_id:id},{validation:true}) 
                .then(()=>{
                    res.redirect('/my_profile/'+req.session.user)
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }else{ 
        console.log('No existen')
        fs.mkdirSync(`./public/data_files_/${user}/Validations`)
        credential.mv(`./public/data_files_/${user}/Validations/${credential.name}`,err => {
            if(err){
                console.log(err) 
            }
        })            
        comparation.mv(`./public/data_files_/${user}/Validations/${comparation.name}`,err => {
            if(err){
                console.log(err) 
            }
        }) 
        
        const credentialComp = `./public/data_files_/${user}/Validations/${credential.name}`
        const photoComp = `./public/data_files_/${user}/Validations/${comparation.name}`
        looksSame( credentialComp,  photoComp)
        .then((dat)=>{
            console.log(dat.equal)
        })
        .catch((err)=>{
            console.log(err)
        })    
    }
}
evt.log_out = async (req,res)=>{
    req.session.destroy();
    console.log('j')
    res.redirect('/login')
}
module.exports = evt;