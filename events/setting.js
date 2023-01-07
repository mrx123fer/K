const evt = {};
const {User,Suscriber, Validation,Privacity, History, Location, Publication} = require('../DataBase/Schema');
const CryptoJS=require('crypto-js')
const fs = require('fs-extra')
evt.index = async (req,res)=>{ 
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){  
        let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8);
        const us = await User.findOne({_id:id})
        try{
            user={
                id:req.session.idUsu,
                name:req.session.name,
                lastname:req.session.lastnames,
                user:req.session.user,  
                email:us.email,
                birtday:us.birtday
            } 
            res.render('general_setting',{user}) 
        }
        catch(err){
            console.log(err)
        } 
    }
}
evt.edit_description = async(req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        const us = await User.findOne({email:req.session.email})
        try{ 
            if(!us){
                console.log('Err')
            }else { 
                res.render('edit_description',{us})
            }
        }catch(err){
            console.log(err)
        }
    }
}
evt.update_decription = async(req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    const us = await User.findOne({_id:id})
    try{
        if(us){console.log(req.body)
            us.description=req.body.description;  
            await us.save()
            try{ 
                req.session.name=us.name
                req.session.lastnames=us.lastname
                //
                console.log('Hi, se logro')
                const hist = {
                    idUser:us.id,
                    source:'General',
                    details:'Description Update yo  '+req.body.description
                }
                History.create(hist)
                try{ 
                    res.redirect('/my_profile/'+req.session.user)
                }
                catch(err){
                    console.log(err)
                }
                
            }
            catch(err){
                console.log(err)
            }
        }
        
    }catch(err){
        console.log(err)
    }
}
evt.edit_name = async(req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){
        console.log(req.session.email)
        const us = await User.findOne({email:req.session.email})
        try{ 
            if(!us){
                console.log('Err')
            }else { 
                res.render('edit_name',{us})
            }
        }catch(err){
            console.log(err)
        }
    }
}
evt.update_name = async(req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    const us = await User.findOne({_id:id})
    try{
        if(us){
            us.name=req.body.name;
            us.lastname=req.body.lastnames; 
            console.log('Esto es usuario para guardar')
            console.log(us)
            await us.save({_id:id})
            try{
                console.log(us)
                req.session.name=us.name
                req.session.lastnames=us.lastname
                //
                const hist = {
                    idUser:us.id,
                    source:'General',
                    details:'Name update. '+req.body.name+' '+req.body.lastnames +' to '+us.name+' '+us.lastname
                }
                History.create(hist)
                try{
                    console.log('Hi')
                    res.redirect('/setting/general')
                }
                catch(err){
                    console.log(err)
                }
                
            }
            catch(err){
                console.log(err)
            }
        }
        
    }catch(err){
        console.log(err)
    }
}
evt.edit_work = async(req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    const us = await User.findOne({_id:id})
    try{
        res.render('edit_work',{us})
    }
    catch(err){
        console.log(err)
    }
}
evt.update_work = async(req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    const user = await User.findOne({_id:id})
    try{
        user.work=req.body.work
        await user.save()
        try{
            res.redirect('/my_profile/'+req.session.user)
        }
        catch(err){
            console.log(err)
        }
    }
    catch(err){
        console.log(err)
    }
}
evt.edit_ocupation = async(req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    const us = await User.findOne({_id:id})
    try{
        res.render('edit_ocupation',{us})
    }
    catch(err){
        console.log(err)
    }
}
evt.update_ocupation = async(req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    const user = await User.findOne({_id:id})
    try{
        user.ocupation=req.body.ocupation
        await user.save()
        try{
            res.redirect('/my_profile/'+req.session.user)
        }
        catch(err){
            console.log(err)
        }
    }
    catch(err){
        console.log(err)
    }
}
evt.edit_mail = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        const us = await User.findOne({email:req.session.email})
        try{ 
            if(!us){
                console.log('Err')
            }else { 
                res.render('edit_mail',{us})
            }
        }catch(err){
            console.log(err)
        }
    }
}
evt.edit_user = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        const us = await User.findOne({email:req.session.email})
        try{ 
            if(!us){
                console.log('Err')
            }else { 
                res.render('edit_user',{us})
            }
        }catch(err){
            console.log(err)
        }
    }
}
evt.edit_language = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8);
        const priv = await Privacity.findOne({idVendedor:id})
        try{ 
            if(!priv){
                console.log('Err')
            }else { 
                res.render('edit_language',{priv})
            }
        }catch(err){
            console.log(err)
        }
    }
}
evt.update_language = async (req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    const priv = await Privacity.findOne({idVendedor:id})
    try{
        if(priv){ 
            priv.language=req.body.language
            await priv.save()
            try{ 
                const hist = {
                    idUser:id,
                    source:'Language & Ubication',
                    details:'Language update to '+req.body.language
                }
                History.create(hist)
                try{ 
                    res.redirect('/setting/language_ubication')
                }
                catch(err){
                    console.log(err)
                }
               
            }
            catch(err){
                console.log(err)
            }
        }
        
    }catch(err){
        console.log(err)
    }
}
evt.edit_address = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8);
        const priv = await Privacity.findOne({idVendedor:id})
        try{ 
            if(!priv){
                console.log('Err')
            }else { 
                res.render('edit_address',{priv})
            }
        }catch(err){
            console.log(err)
        }
    }
}
evt.update_address = async (req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    const priv = await Privacity.findOne({idVendedor:id})
    try{
        if(priv){ 
            priv.address=req.body.address
            await priv.save()
            try{
                const hist = {
                    idUser:id,
                    source:'Language & Ubication',
                    details:'Ubication update to '+req.body.address
                }
                History.create(hist)
                try{
                    console.log('Hi')
                    res.redirect('/setting/language_ubication')
                }
                catch(err){
                    console.log(err)
                } 
                
            }
            catch(err){
                console.log(err)
            }
        }
        
    }catch(err){
        console.log(err)
    }
}
evt.edit_phone = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
       res.render('edit_my_phone')
    }
    
}
evt.update_phone = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
        const usData = User.findOne({_id:id})
        try{ 
            if(usData){ 
                usData.phone=req.body.phone 
                const up = await User.findOneAndUpdate({_id:id},{phone:req.body.phone});
                try{
                    console.log(up)
                    res.redirect('/my_profile/'+req.session.user)
                }catch(err){
                    console.log(err)
                }
            }else if(!usData){
                console.log('No existe el usuario')
            }
        }
        catch(err){
            console.log(err)
        }
    } 
}
evt.edit_direction = async (req,res)=>{
    /*if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
       res.render('edit_my_phone')
    }*/
    const location = await Location.find()
    try{
        console.log(location)
        res.render('edit_my_direction',{location})
    }
    catch(err){
        console.log(err)
    }
}
evt.update_direction = async (req,res)=>{ 
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    const dirUser = await User.findOneAndUpdate({_id:id},{direction:req.body})
    try{
        console.log(dirUser)
        res.redirect('/my_profile/'+req.session.user)
    }
    catch(err){
        console.log(err)
    }
}
evt.update = async (req,res)=>{
    
}
evt.lang_ub = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
        const priv = await Privacity.findOne()
        try{
            res.render('language_settings',{priv})
        }
        catch(err){
            console.log(err)
        }
    }
}
evt.privacity = async (req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        const privacity = await Privacity.findOne({idVendeor:id})
        res.render('privacity',{privacity})
    }
}
evt.privacity_checked = async (req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        const privacity = await Privacity.findOne({idVendeor:id})
        const info = {
            age:privacity.age,
            dataAge:privacity.dataAge,
            comment:privacity.comment
        }
        res.json(info)
    }   
}
evt.log_in = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        res.render('log_in_settings')
    }
}
evt.change_pass = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        res.render('change_pass',{layouts:'main_sessions'})
    }
}
evt.edit_birtday = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        res.render('edit_birtday')
    }
}
evt.update_birtday = async (req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    const us = await User.findOne({id:id})
    try{
        if(us){ 
            us.birtday=req.body.birtday
            await us.save()
            try{ 
                res.redirect('/setting/general')
            }
            catch(err){
                console.log(err)
            }
        }
        
    }catch(err){
        console.log(err)
    }
}
evt.birtday_show = async (req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    if(req.params.status=='no_show'){
        console.log(req.params.status)
        const priv = await Privacity.findOne({idVendedor:id})
        try{
            if(priv){ 
                priv.age=false
                await priv.save()
                try{ 
                    console.log(priv)
                    res.json({age:priv.age})
                }
                catch(err){
                    console.log(err)
                }
            }
            
        }catch(err){
            console.log(err)
        }
    }else if(req.params.status=='show'){ 
        console.log(req.params.status)
        const priv = await Privacity.findOne({idVendedor:id})
        try{
            if(priv){ 
                priv.age=true
                await priv.save()
                try{ 
                    res.json({age:priv.age})
                }
                catch(err){
                    console.log(err)
                }
            }
            
        }catch(err){
            console.log(err)
        }
    }
}
evt.data_register_show = async (req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    if(req.params.status=='no_show'){
        console.log(req.params.status)
        const priv = await Privacity.findOne({idVendedor:id})
        try{
            if(priv){ 
                priv.dataAge=false
                await priv.save()
                try{ 
                    console.log(priv)
                    res.json({dataAge:priv.dataAge})
                }
                catch(err){
                    console.log(err)
                }
            }
            
        }catch(err){
            console.log(err)
        }
    }else if(req.params.status=='show'){ 
        console.log(req.params.status)
        const priv = await Privacity.findOne({idVendedor:id})
        try{
            if(priv){ 
                priv.dataAge=true
                await priv.save()
                try{ 
                    res.json({dataAge:priv.dataAge})
                }
                catch(err){
                    console.log(err)
                }
            }
            
        }catch(err){
            console.log(err)
        }
    }
}
evt.comment_show = async (req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    if(req.params.status=='no_show'){
        console.log(req.params.status)
        const priv = await Privacity.findOne({idVendedor:id})
        try{
            if(priv){ 
                priv.comment=false
                await priv.save()
                try{ 
                    console.log(priv)
                    res.json({comment:priv.comment})
                }
                catch(err){
                    console.log(err)
                }
            }
            
        }catch(err){
            console.log(err)
        }
    }else if(req.params.status=='show'){ 
        console.log(req.params.status)
        const priv = await Privacity.findOne({idVendedor:id})
        try{
            if(priv){ 
                priv.comment=true
                await priv.save()
                try{ 
                    res.json({comment:priv.comment})
                }
                catch(err){
                    console.log(err)
                }
            }
            
        }catch(err){
            console.log(err)
        }
    }
}
evt.change_profile = async (req,res)=>{
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
 
    let user= req.session.user
    const file = fs.existsSync(`./public/data_files_/${user}`) 
    if(file==true){
        save();
    }else if(file==false){
        fs.mkdir(`./public/data_files_/${user}`)
        save();
    }
    function save(){
        let photo = req.files.profile, publication={archive:{images:[],archives:[],pdf:[]}}
        if(photo){ 
            publication.archive.images[0]=req.files.profile.name;
            user.photo=req.files.profile.name
        }
        if(req.body.description_photo){
            publication.description=req.body.description_photo
        }
        if(req.body.ubication){
            publication.ubication=req.body.ubication
        }
        publication.type=3;
        publication.idUser=id
        let obj=photo.length; 
            if(!obj){ 
                obj=[req.files.pdf]  
            }else if(obj>=1){ 
                obj=req.files.pdf
            } 
        photo.mv(`./public/data_files_/${user}/Images/${photo.name}`,err => {
            if(err){
                console.log(err) 
            }
        })

        const pub = Publication.create(publication)
        try{
            if(pub){ 
                User.findOne({_id:id})
                .then((user)=>{
                    user.photo='/data_files_/'+req.session.user+'/'+req.files.profile.name
                    console.log('Hola')
                    console.log(user)
                    User.findOneAndUpdate({_id:id},user)
                    .then(()=>{
                        console.log('Se logro')
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                })
                .catch((err)=>{console.log(err)})
                
            }else if(!pub){
                console.log('Error')
            }
        }catch(err){console.log(err)}
    }
}
module.exports = evt;