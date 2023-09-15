// Importa los módulos necesarios
import express from 'express';
import bodyParser from 'body-parser';
import { sesion, autLogin, Aut, logAut, autSesion } from './controller/loginControlador.mjs';
import { rutaMantEmpleados,registroEmpleados } from './controller/mant-empleados.mjs';
import { CreaAhorro } from './controller/mant-ahorroControlador.mjs';
import { rutas } from './routes/loginRutas.mjs';
import {CrearDeposito} from './controller/deposito-controlador.mjs'
import { CrearRetiro } from './controller/retiro-controlador.mjs';
import { rutaMantSocios } from './controller/mant-socios.mjs';


// Crea la aplicación Express
const app = express();

// Configura los middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Configura el directorio público
app.use('/recursos', express.static('public'));
app.use('/recursos', express.static(import.meta.url + 'public'));

// Establece el motor de plantillas EJS
app.set('view engine', 'ejs');

// Configura las rutas y controladores
app.use(sesion);

app.get('/login', rutas);
app.get('/logAut', autSesion, logAut);
app.get('/mantenimiento-socios', rutas);
app.get('/socios-creacion', autSesion, rutas);
app.get('/mantenimiento-empleados', rutas);
app.get('/mantenimiento-ahorros', rutas);
app.get('/creacion-ahorro', rutas);

// Creación de cuenta de ahorro
app.post('/mantenimiento-ahorros', CreaAhorro);

// Autenticación
app.post('/aut', autLogin);
app.get('/', Aut);
app.get('/cerrar-sesion', rutas);

// Creación de empleados, edicion  y eliminación
app.post('/crear-empleado', registroEmpleados);

app.get('/editar-empleado/:id',rutas)
app.post('/mantenimiento-empleados', rutas)
app.get('/mantenimiento-empleados/:id',rutas)
// app.delete('/mantenimiento-empleados/:id',rutas)
app.get('/eliminar-empleados/:id', rutaMantEmpleados.eliminarUsuario);

//creacion deposito
app.post('/realizar-deposito',CrearDeposito)
app.get('/realizar-deposito',rutas)

//creacion retiro
app.post('/realizar-retiro',CrearRetiro)
app.get('/realizar-retiro',rutas)


//rutas sobre gestion de socio
app.get('/mantenimiento-socios', rutas)
app.get('/crear-nuevo-Socio', rutas)
app.post('/guardar-Socio', rutas)
app.get('/editar-datos-socio/:id', rutas)
app.post('/recibir-datos-a-actualizar/:id', rutas) 
app.get('/ver_info_completa_socio/:id', rutas)
//buscar socio por cedula
app.post('/buscar_por_cedula', rutas)

//error la cedula ya existe
app.get('/error-cedula-ya-existe', rutas)

//Socio inactivo
app.post('/socio_inactivo/:id', rutas)

//mostrar socios inactivos 
app.post('/mostrar_socios_inactivos', rutas)



//prestamos
app.get('/mantenimiento-prestamos' , rutas)
app.get('/crear-prestamos',rutas)    
// Inicia el servidor en el puerto 8001
app.listen(8001, () => {
  console.log("Escuchando en el puerto 8001");
});