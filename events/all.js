const evt = {};
const {User,Suscriber, Validation, Product, History, Publication} = require('../DataBase/Schema');
const CryptoJS=require('crypto-js') 
/*evt.marketplace = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){  
        const productos = await Product.find().sort({datepublication:-1}).lean({ virtuals: true})
        try{

            for(let i=0; i<productos.length; i++){
                const us = await User.findOne({id:productos[i].idVendedor})
                try{
                    let idCode=encodeURIComponent(CryptoJS.AES.encrypt(us.id,'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString())
                    productos[i].idCode=idCode
                    productos[i].nameUs=us.name+' '+us.lastname
                    productos[i].user=us.user   
                }
                catch(err){
                    console.log(err)
                }
            } 
            console.log(productos) 
            let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
            const us = await User.findOne({id:id})
            try{
                productos.idVendedor=us.name+' '+us.lastname
                user={
                    id:req.session.idUsu,
                    name:req.session.name,
                    lastname:req.session.lastname,
                    user:req.session.user
                };
                    console.log(productos)
                    res.render('marketplace',{productos,user}) 
            }
            catch(err){
                console.log(err)
            }

        }  
        catch(err){
            console.log(err)
        }
        
    }
}*/
evt.account_setting_r = async (req,res)=>{    
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){  
    const productos = await Product.find().sort({datepublication:-1}).lean({ virtuals: true})
    try{
        let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8);
        const us = await User.findOne({id:id})
        try{
            user={
                id:req.session.idUsu,
                name:req.session.name,
                lastname:req.session.lastname,
                user:req.session.user,  
                email:us.emails
            }
            console.log(user)
            res.render('account_setting',{productos,user}) 
        }
        catch(err){
            console.log(err)
        }
    }  
    catch(err){
        console.log(err)
    }
    
}

}
evt.my_shopping = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){
        res.render('my_shopping')
    }
}
evt.my_history = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){
        let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
        const history = await History.find({idUser:id})
        try{
            console.log(history)
            res.render('my_history',{history})
        }
        catch(err){
            console.log(err)
        }
    }
}
evt.help = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){
        res.render('help')
    }
}
evt.about = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){
        res.render('about')
    }
}
evt.profile = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){ 
        let id = req.params.idUser, user = req.params.user;
        let idU=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
        if(id==idU){
            res.redirect('/my_profile/'+req.session.user)
        }
        Publication.find({idUser:id}, function (err, pubs) {
            if(err){
                console.log(err)
            }
            User.populate(pubs, { path: "idUser" }, function (err, publications) {
                if(err){
                    console.log(err)
                }
                console.log(publications)
                    User.findOne({_id:id})
                    .then((user)=>{ 
                        User.findOne({_id:idU})
                        .then((user2)=>{ 
                            const viewModel={publications:publications,user:user2,userU:user}
                            res.render('profile',viewModel)
                        }) 
                        .catch((err)=>{
                            console.log(err)
                        })
                }) 
                .catch((err)=>{
                    console.log(err)
                })
            });
          });
    }
}
evt.my_profile = async (req,res)=>{
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){
        console.log('h')
        let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
        let user = req.params.user;
        const us = await User.findOne({_id:id})
        try{
            let user = {id:req.session.idUsu, name:req.session.name, lastname:req.session.lastnames, user:req.session.user, email:req.session.email}
            Publication.find({idUser:id}, function (err, pubs) {
                if(err){
                    console.log(err)
                }
                User.populate(pubs, { path: "idUser" }, function (err, publications) {
                    if(err){
                        console.log(err)
                    } 
                    User.findOne({_id:id})
                    .then((user)=>{  
                        const viewModel={publications:publications,user:user}
                    res.render('my_profile',viewModel)
                    }) 
                    .catch((err)=>{
                        console.log(err)
                    })
                });
            });
            
        }
        catch(err){
            cosole.log(err)
        }
    }
}
evt.academy = async (req,res)=>{ 
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){
        let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
        Publication.find({}, function (err, pubs) {
            if(err){
                console.log(err)
            }
            User.populate(pubs, { path: "idUser" }, function (err, publications) {
                if(err){
                    console.log(err)
                }
                console.log(publications)
                let user = {id:req.session.idUsu, name:req.session.name, lastname:req.session.lastnames, user:req.session.user, email:req.session.email}
                res.render('academy',{publications,user})
            });
          });
        
    }
}
evt.search_friend = async (req,res)=>{
    console.log(req.body)
    const Res={}
    let results =  [{name:'Fer'},{name:'Luis'}]
    res.json({status:true,results:results})
}
evt.act_bd = async (req,res)=>{
    Publication.find({idUser:'634b924b83158c0106ea1449'}, function (err, publications) {
        if(err){
            console.log(err)
        }
        User.populate(publications, { path: "idUser" }, function (err, pub) {
            if(err){
                console.log(err)
            } 
                for(let i=0; i<pub.length; i++){ 
                    for(let j=0; j<pub[i].archive.images.length; j++){
                        console.log(pub[i].archive.images[j])
                        pub[i].archive.images[j]=`/data_files_/${pub[i].idUser.user}/Images/${pub[i].archive.images[j]}`
 
                        console.log(pub[i].archive.images[j])
                    } 
                    Publication.findByIdAndUpdate({_id:pub[i]._id},pub[i])
                    .then(()=>{
                        console.log('Logrado')
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }  
        });
      }); 
}
evt.look = async (req,res)=>{
    res.render('look',{layout:'main_look'})
}
module.exports = evt;