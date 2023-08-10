const express = require('express');
const router = express.Router();

const customerController =  require('../controllers/cooperativa_Controller');

//Rutas del formulario Create Nuevo Mienbro Adulto
router.get('/', customerController.list);
router.post('/add', customerController.save);
router.get('/delete/:id', customerController.delete);

router.get('/edit/:id', customerController.edit);
router.post('/update/:id', customerController.update);
router.get('/editlist_miembro_creado', customerController.list_mienbro_creado);
//Rutas del formulario Create Nuevo Mienbro Adulto












//Rutas del formulario Create Nuevo Mienbro Infantil
router.get('/create_cuenta_infantil', customerController.create_cuenta_infantil);

//Rutas del formulario Create Nuevo Mienbro estudiantil
router.get('/create_cuenta_estudiantil', customerController.create_cuenta_estudiantil);







module.exports = router;

