const btnUpdate = document.getElementById('btnmyqrU')
$('#qr_generate').submit((e)=>{
    e.preventDefault();
    let dat={};
    
    dat.name=document.getElementById('name').value;  
    dat.text=document.getElementById('contend').value; 
    $.post('/tool/qr_generate',dat,()=>{
 
    }) 
    .done(data=>{ 
      if(data.status==true){ 
        document.getElementById("myqr").src=data.myQr;
        document.getElementById("myqrd").href=data.myQr;
        document.getElementById("myqrd").download='miQR.png';
        document.getElementById("btnmyqrd").disabled=false;
      }else if (data.status==false){
        document.getElementById("myqr").src='/images/err.jpg'; 
      }
    })
    .fail(function() {
        alert( "error" );
    })
    /*.always(function() {
        alert( "finished" );
    });*/
}); 
$('#qr_edit').submit((e)=>{
    e.preventDefault();
    let dat={};
    dat.text=document.getElementById('contend').value;
    dat.id=document.getElementById('qr').value;  
    dat.name=document.getElementById('nameQR').value;  
    $.post('/edit_qr/generate/'+dat.id,dat,()=>{
 
    }) 
    .done(data=>{ 
      if(data.status==true){  
        document.getElementById("myqr").src=data.myQr; //Imagen 
        document.getElementById("myqrD").href=data.myQr;  //Boton href de descarga
        document.getElementById("myqrD").download='Miqr.png'
        document.getElementById("btnmyqrU").disabled=false;
        document.getElementById('contend').disabled=true;
        document.getElementById('btnG').style.display='none';

      }else if (data.status==false){
        document.getElementById("myqr").src='/images/err.jpg'; 
      }
    })
    .fail(function(err) {
        console.log( err );
        alert('err')
    })
    /*.always(function() {
        alert( "finished" );
    });*/
}); 
btnUpdate.addEventListener('click',event => {
    let dat={};
    dat.name=document.getElementById('nameQR').value;   
    dat.text = document.getElementById('contend').value
    dat.id=document.getElementById('qr').value;  
    dat.code=document.getElementById('myqr').src; 
    console.log(dat)
    $.post('/edit_qr/update/'+dat.id,dat,()=>{
 
    }) 
    .done(data=>{ 
        if(data.status==true){
            console.log('Hola estas en boton actualizar')
            document.getElementById("download").style.display='flex';
            document.getElementById('update').style.display='none';

        }
    });
})

 console.log('Hi')
