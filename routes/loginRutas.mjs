import { Router } from 'express';

export const rutas = Router();

import { rutasLogin , sesionExp,cerrarsesion} from '../controller/loginControlador.mjs';
import{rutaIndex}from '../controller/indexControlador.mjs'
import{rutaMantSocios} from '../controller/mant-socios.mjs'
import{rutaMantEmpleados} from '../controller/mant-empleados.mjs'
import { rutasahorros } from '../controller/mant-ahorroControlador.mjs';

// ruta de inicio de sesion registro y del index 
rutas.get('/login', rutasLogin.login);
rutas.get('/', rutaIndex.index)
rutas.get('/mantenimiento-socios',rutaMantSocios.mantSocios)
rutas.get('/socios-creacion',rutaMantSocios.mantSociosCreacion)
rutas.get('/mantenimiento-empleados',rutaMantEmpleados.mantEmpl)
rutas.get('/sesion-expirada',sesionExp)
rutas.get('/cerrar-sesion',cerrarsesion)
rutas.get('/mantenimiento-ahorros',rutasahorros.ahorros)
rutas.get('/creacion-ahorro',rutasahorros.CreacionAhorro)
