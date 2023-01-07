const path = require ('path');
let exphbs = require('express-handlebars')
const session=require('express-session');
const morgan = require('morgan') 
const CryptoJS=require('crypto-js') 
const fileUpload = require('express-fileupload')
const express = require('express')  
const sessions = require('../routes/session');
const academy = require('../routes/academy');
const all = require('../routes/all');      
const tools = require('../routes/tool');   
const post = require('../routes/publications');
const chat = require('../routes/chat')    
const { __express } = require('hbs');   
const app = express();  
const handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const settings = require('../routes/settings');
const settings_card = require('../routes/settings_card');
const comments = require('../routes/comment'); 
const { comment_show } = require('../events/setting');

//Socket

module.exports = app =>{
//Setings

app.use(fileUpload())
app.set('port',process.env.port||40) ;  
app.set('views','./views');  
app.engine(
  ".hbs", exphbs.engine({
    defaultLayout: "main",
    layoutsDir:"views/layouts",
    partialsDir:"views/partials",
    helpers:require('./helpers'),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(handlebars)
  })
);
app.set("view engine", ".hbs");
 
    //Middelware's
    app.use(morgan('dev'));
    //Session
    app.use(session({
      secret:"xml",
      resave:true,
      saveUninitialized:true
  })); 
    app.use(express.urlencoded({extended:false}));
    app.use(express.json())
    //Rutas  
    sessions(app); 
    all(app);
    settings(app); 
    settings_card(app); 
    comments(app);
    tools(app);
    academy(app)
    post(app);
    chat(app)
    //Static  
    app.use(express.static(path.join(__dirname,'../public')))
    //errohandlers 
    
    //Retorno
    return app;
}