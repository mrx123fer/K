const evt = {};
const path = require('path')
const {User,Suscriber, Validation, Product, History,Publication} = require('../DataBase/Schema');
const CryptoJS=require('crypto-js') 
const fs = require('fs-extra')
evt.create_publication = async (req,res)=>{ 
    let user = req.session.user, PDf = req.files.pdf,  IMage = req.files.image, ARchive = req.files.archive     
    const public = new Publication();
    console.log(public)
    let id=CryptoJS.AES.decrypt(decodeURIComponent(req.session.idUsu), 'VIoKngUfXNionpiVCdbLURA6nwV44yVfTDwf48a7jNbsPPnccW').toString(CryptoJS.enc.Utf8)
    public.description=req.body.description
    public.idUser=id; 
    public.type=4;
    const resUser = fs.existsSync(`./public/data_files_/${user}`) 
    if(resUser==true){
        save();
    }else if(resUser==false){
        fs.mkdir(`./public/data_files_/${user}`)
        save();
    }
    function save(){
        if(ARchive){  
            let obj=ARchive.length; 
            if(!obj){
                console.log('No es objeto')
                ARchive=[req.files.archive]  
            }else if(obj>=1){
                console.log('Es objeto')
                ARchive=req.files.archive
            } 
            for (let i=0; i<ARchive.length; i++){
                public.archive.archives[i]=`/data_files_/${user}/Archives/${ARchive[i].name}`
            } 
            console.log('NOmbre de archivos')
            console.log(public)
            console.log('Save Archive')
            const resarchiv = fs.existsSync(`./public/data_files_/${user}/Archives`) 
            if(resarchiv==true){
                console.log('Si existe la carpeta Archives')
                for(let i=0; i<ARchive.length; i++){ 
                    ARchive[i].mv(`./public/data_files_/${user}/Archives/${ARchive[i].name}`,err => {
                        if(err){
                            console.log(err) 
                        }
                    })                
                }   
            }else if(resarchiv==false){
                console.log('No existe la carpeta Archives')
                fs.mkdirSync(`./public/data_files_/${user}/Archives`)  
                for(let i=0; i<ARchive.length; i++){
                    console.log(ARchive)    
                    ARchive[i].mv(`./public/data_files_/${user}/Archives/${ARchive[i].name}`,err => {
                        if(err){
                            console.log(err) 
                        }
                    })                
                }         
            } 
            
        } 
        if(PDf){
            let obj=PDf.length; 
            if(!obj){
                console.log('No es objeto')
                PDf=[req.files.pdf]  
            }else if(obj>=1){
                console.log('Es objeto')
                PDf=req.files.pdf
            } 
            for (let i=0; i<PDf.length; i++){
                public.archive.pdf[i]=`/data_files_/${user}/PDF/${PDf[i].name}`
            } 
            console.log('Save PDF')
            const resarchiv = fs.existsSync(`./public/data_files_/${user}/PDF`) 
            if(resarchiv==true){
                console.log('Si existe la carpeta PDF')
                for(let i=0; i<PDf.length; i++){
                    PDf[i].mv(`./public/data_files_/${user}/PDF/${PDf[i].name}`,err => {
                        if(err){
                            console.log(err) 
                        }
                    })                
                }   
            }else if(resarchiv==false){
                console.log('No existe la carpeta PDF')
                fs.mkdirSync(`./public/data_files_/${user}/PDF`)
                for(let i=0; i<PDf.length; i++){
                    PDf[i].mv(`./public/data_files_/${user}/PDF/${PDf[i].name}`,err => {
                        if(err){
                            console.log(err) 
                        }
                    })            
                }            
            } 
            
        } 
        if(IMage){ 
            let obj=IMage.length; 
            if(!obj){
                console.log('No es objeto')
                IMage=[req.files.image]  
            }else if(obj>=1){
                console.log('Es objeto')
                IMage=req.files.image
            } 
            for (let i=0; i<IMage.length; i++){
                public.archive.images[i]=`/data_files_/${user}/Images/${IMage[i].name}`
            } 
            console.log('Save Image')
            const resarchiv = fs.existsSync(`./public/data_files_/${user}/Images`) 
            if(resarchiv==true){
                console.log('Si existe la carpeta Images')
                for(let i=0; i<IMage.length; i++){
                    IMage[i].mv(`./public/data_files_/${user}/Images/${IMage[i].name}`,err => {
                        if(err){
                            console.log(err) 
                        }
                    })                
                }   
            }else if(resarchiv==false){
                console.log('No existe la carpeta Images')
                fs.mkdirSync(`./public/data_files_/${user}/Images`)
                for(let i=0; i<IMage.length; i++){
                    IMage[i].mv(`./public/data_files_/${user}/Images/${IMage[i].name}`,err => {
                        if(err){
                            console.log(err) 
                        }
                    })            
                }            
            } 
            
        } 
    }
    public.privacity.my_public=true
    console.log(public) 
    const saved = await  public.save()
    try{
        res.redirect('/academy')
    }
    catch(err){
        console.log(err)
    }
    
}

module.exports = evt;