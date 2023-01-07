const evt = {};
const {User,Suscriber, Validation, Publication,Comment, Publication_D} = require('../DataBase/Schema');
const CryptoJS=require('crypto-js')
evt.edit_publication = async (req,res)=>{
    let id = req.params.idPublication
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
                    console.log(comments)
                    let user = {id:req.session.idUsu, name:req.session.name, lastname:req.session.lastnames, user:req.session.user, email:req.session.email}
                    const viewModel={publications:publications, comment:comments, user:user}
                    console.log(viewModel.comments)
                    res.render('edit_publication',viewModel)
                });
            });
        });
    }); 
}
evt.update_publication = async (req,res)=>{ 
    const publication = await Publication.findOne({_id:req.params.idPub})
    try{
        if(publication){
            publication.description=req.body.description
            const pu = await Publication.findOneAndUpdate({_id:req.params.idPub},publication)
            try{
                if(pu){ 
                    res.redirect('/edit_publication/'+pu._id)
                }else if(!pu){
                    console.lo('No se actualizo la informacion')
                }
            }catch(err){
                console.log(err)
            }
        }else if(publication==null){
            console.log('No se encontro la publicacion')
        }
    }catch(err){
        console.log(err)
    }
    
}
evt.publications_user = async (req,res)=>{
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
            res.render('user_publications',{publications,user})
        });
      });
    
}
evt.privacity_ = async (req,res)=>{
    const publication = await Publication.findOne({_id:req.params.idPub})
    try{
        publication.privacity.public=false,
        publication.privacity.my_public=false,
        publication.privacity.private=false
        if(parseInt(req.params.type)==1){ 
            publication.privacity.public=true
        } else if(parseInt(req.params.type)==2){ 
            publication.privacity.my_public=true
        } else if(parseInt(req.params.type)==3){ 
            publication.privacity.private=true
        }
        const pubDat = await Publication.findOneAndUpdate({_id:req.params.idPub},publication)
        try{
            res.redirect('/koopus/publication/'+pubDat._id)
        }catch(err){
            console.log(err)
        }
    }catch(err){
        console.log(err)
    }
}
evt.delete_publication = async (req,res)=>{
    let idPub = req.params.idPub
    const pub = await Publication.findOne({_id:idPub})
    try{
        if(pub){
            console.log(pub)
            const pub2 = {
                description:pub.description,
                datepublication:pub.datepublication,
                views:pub.views,
                idUser:pub.idUser,
                archive:pub.archive,
                type:pub.type,
                privacity:pub.privacity

            }
            const pub_D = await Publication_D.create(pub2)
            try{
                if(pub_D){
                    const pu = await Publication.findOneAndDelete({_id:pub._id})
                    try{
                        if(pu){
                            res.redirect('/my_profile/'+req.session.user)
                        }else if(!pu){
                            console.log('No se elimino')
                        }
                    }catch(err){
                        console.log(err)
                    }
                }else if(!pub_d){
                    console.log('No se creo el historial')
                }
            }catch(err){
                console.log(err)
            }
        }else if(!pub){
            console.log('No se consulto')
        }
    }
    catch(err){
        console.log(err)
    }
}
module.exports = evt;