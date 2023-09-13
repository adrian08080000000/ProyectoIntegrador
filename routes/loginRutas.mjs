import { Router } from 'express';
export const rutas = Router();

import { rutasLogin } from '../controller/loginControlador.mjs';
import {rutasregistro} from '../controller/registroControlador.mjs'
import{rutaIndex}from '../controller/indexControlador.mjs'
import{rutaMantSocios} from '../controller/mant-socios.mjs'

// ruta de inicio de sesion registro y del index 
rutas.get('/login', rutasLogin.login);
rutas.get('/rp', rutasregistro.registro);
rutas.get('/', rutaIndex.index)
rutas.get('/mantenimiento-socios',rutaMantSocios.mantSocios)
rutas.get('/socios-creacion',rutaMantSocios.mantSociosCreacion)




