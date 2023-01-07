const evt = {};
const {User,Suscriber, Validation, Product, History,Comment,Publication} = require('../DataBase/Schema');
const CryptoJS=require('crypto-js') 
evt.add_comment = async (req,res)=>{ 
    if(!req.session.name){
        res.redirect('/login')
    }else if(req.session.name){
        console.log(req.params)
        let idUser=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
        console.log(idUser)
        const comment = new Comment();
        comment.comment=req.body.comment;
        comment.idUser=idUser;
        comment.idpublication=req.params.idPublication; 
        await Comment.create(comment)
        try{
            let idP=encodeURIComponent(CryptoJS.AES.encrypt(req.params.idPublication,'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString())
            res.redirect('/koopus/publication/'+idP+'/')
        }
        catch(err){
            console.log(err)
        }
    }
}
evt.publication = async (req,res)=>{ 
        let id=CryptoJS.AES.decrypt(decodeURIComponent(req.params.idPublication), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
        if(id.length>10){ 
        }else if(id.length<=0){
            id=req.params.idPublication
        }
        console.log(id)
        Publication.findOne({_id:id}, function (err, pubs) {
            if(err){
                console.log(err)
            }
            User.populate(pubs, { path: "idUser" }, function (err, publications) {
                if(err){
                    console.log(err)
                }
                Comment.find({idpublication:req.params.idPublication}, function (err, comm) {
                    if(err){
                        console.log(err)
                    }
                    User.populate(comm, { path: "idUser" }, function (err, comments) {
                        if(err){
                            console.log(err)
                        } 
                        let user = {id:req.session.idUsu, name:req.session.name, lastname:req.session.lastnames, user:req.session.user, email:req.session.email}
                        const viewModel={publication:publications, comment:comments, user:user}
                        res.render('product_comment',viewModel)
                    });
                });
            });
          }); 
    
}
module.exports = evt;