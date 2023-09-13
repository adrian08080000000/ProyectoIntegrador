//  Invocamos a express
import express, {  urlencoded } from 'express';
const app = express();



//seteamos las urls 
app.use(urlencoded({extended:false}));
app.use(express.json());


// directorio publico 
app.use('/recursos', express.static('public'))
app.use('/recursos', express.static(import.meta.url + 'public'));


//Establecer el motor de plantillas ejs
app.set('view engine ','ejs');





//variable de seciones
import { autLogin,sesion ,Aut,logAut} from './controller/loginControlador.mjs';
import {creSoc, buscarSoc} from './controller/mant-socios.mjs'

app.use(sesion)



//manejo de rutas 
import {rutas}from './routes/loginRutas.mjs'; 
app.get('/login',rutas);
app.get('/rp', rutas);
app.get('/logAut',logAut);
app.get('/mantenimiento-socios',rutas)
app.get('/socios-creacion',rutas)


//registro

//Autenticacion 

app.post('/aut',autLogin)
app.get('/',Aut) 

//Creacion miembro
app.post('/socios-creacion', creSoc);
  app.post('/socios-buscar', buscarSoc)
  
  
  

app.listen(8000,(request, response) => {
    console.log("Escuchando en el puerto 8000")
})
