import { Router } from 'express';

export const rutas = Router();

import { rutasLogin , sesionExp,cerrarsesion} from '../controller/loginControlador.mjs';
import{rutaIndex}from '../controller/indexControlador.mjs'
import{rutaMantSocios} from '../controller/mant-socios.mjs'
import{rutaMantEmpleados} from '../controller/mant-empleados.mjs'
import { rutasahorros } from '../controller/mant-ahorroControlador.mjs';
import {rutaMantPres} from '../controller/mant-prestamos.mjs';
import { rutasdeposito } from '../controller/deposito-controlador.mjs';
import { rutasretiro } from '../controller/retiro-controlador.mjs';


// ruta de inicio de sesion registro y del index 
rutas.get('/login', rutasLogin.login);
rutas.get('/', rutaIndex.index)
rutas.get('/mantenimiento-empleados',rutaMantEmpleados.mantEmpl)
rutas.get('/sesion-expirada',sesionExp)
rutas.get('/cerrar-sesion',cerrarsesion)
rutas.get('/mantenimiento-ahorros',rutasahorros.ahorros)
rutas.get('/creacion-ahorro',rutasahorros.CreacionAhorro)
rutas.get('/editar-empleado/:id',rutaMantEmpleados.editarEmp)
rutas.post('/mantenimiento-empleados',rutaMantEmpleados.confirEditEmp)
rutas.get('/eliminar-empleados/:id',rutaMantEmpleados.eliminarUsuario)
rutas.get('/mantenimiento-prestamos' , rutaMantPres.mantPres)
rutas.get('/crear.prestamo',rutaMantPres.crearPres)

// deposito y retiro
rutas.get('/realizar-deposito',rutasdeposito.CreacionDeposito)
rutas.get('/realizar-retiro',rutasretiro.CreacionRetiro)



//gestion sobre socio
rutas.get('/mantenimiento-socios',rutaMantSocios.mant_Socios)
rutas.get('/crear-nuevo-Socio',rutaMantSocios.formulario_crear_nuevo_Socios)
rutas.post('/guardar-Socio',rutaMantSocios.guardar_Socio)
rutas.get('/editar-datos-socio/:id',rutaMantSocios.ver_info_socio_a_editar)
rutas.post('/recibir-datos-a-actualizar/:id',rutaMantSocios.actualizacion_datos_socio)
rutas.get('/ver_info_completa_socio/:id',rutaMantSocios.ver_info_completa_socio)
//buscar por cedula 
rutas.post('/buscar_por_cedula',rutaMantSocios.buscar_por_cedula)

//buscar por cedula 
rutas.get('/error-cedula-ya-existe',rutaMantSocios.error_cedula_ya_existe)

//Socio inactivo, inavilitar
rutas.post('/socio_inactivo/:id',rutaMantSocios.socio_inactivo)

//mostrar sen la tabla los socios inactivos 
rutas.get('/mostrar_socios_inactivos',rutaMantSocios.mostrar_socios_inactivos)





rutas.post('/confi-edit-empleados', (req, res) => {
    try {
     
      const { idUsuario, name, permisos, contra } = req.body;
  
      res.redirect('/mant-empleados'); 
  
      
    } catch (error) {
    
      console.error('Error en la edición de empleados:', error);
      res.status(500).send('Error en la edición de empleados'); // Envía una respuesta de error al cliente
    }
  });