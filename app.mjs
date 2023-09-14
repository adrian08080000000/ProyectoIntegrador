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


// Importa el middleware de autenticación
import {autSesion} from './controller/loginControlador.mjs';



import { autLogin,sesion ,Aut,logAut} from './controller/loginControlador.mjs';
import {registroEmpleados ,editEmp} from './controller/mant-empleados.mjs'
import { CreaAhorro } from './controller/mant-ahorroControlador.mjs';
import {CrearDeposito} from './controller/deposito-controlador.mjs'

app.use(sesion)



//manejo de rutas 
import {rutas}from './routes/loginRutas.mjs'; 
import { conection } from './database/db.mjs';
app.get('/login',rutas);
app.get('/logAut',autSesion,logAut);
app.get('/mantenimiento-socios',rutas);
app.get('/socios-creacion',autSesion,rutas);
app.get('/mantenimiento-empleados',rutas);
app.get('/mantenimiento-ahorros',rutas);
app.get('/creacion-ahorro',rutas);
app.get('/realizar-deposito',rutas)


//creacion de cuenta de ahorro
app.post('/mantenimiento-ahorros',CreaAhorro)

//creacion deposito
app.post('/realizar-deposito',CrearDeposito)

//registro

//Autenticacion 

app.post('/aut',autLogin)
app.get('/',Aut) 
app.get('/cerrar-sesion',rutas)
//creacion empleados , eliminacion
app.post('/crear-empleado',registroEmpleados);
app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  conection.query('SELECT * FROM Usuarios WHERE id = ?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('editarEmpleado.ejs', {
        usuario: results[0]
      });
    }
  });
});

app.post('/editar/:id',editEmp)
//Creacion miembro

  

app.listen(8001,(request, response) => {
    console.log("Escuchando en el puerto 8001")
})
