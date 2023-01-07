const express = require('express')
const config = require('./server/config')
// Socket.io
//DataBase
require('./DataBase/conection')
//Iniciando el servidor
const app = config(express());
app.listen(app.get('port'),()=>{
    console.log('Servidor en el puerto', app.get('port'));
})