export const rutasahorros= {}
import { conection } from '../database/db.mjs';


rutasahorros.ahorros= (req,res)=>{
    res.render('mant-ahorros.ejs');
}

rutasahorros.CreacionAhorro = (req,res)=>{
    res.render('crea-Ahorro.ejs');
}


    export const CreaAhorro = (req, res) => {
        const cedula = req.body.cedula;
        const monto = req.body.monto;
        const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
      
        // Consulta la base de datos para obtener los usuarios
        conection.query('SELECT idSocio FROM socios WHERE cedulaSocio = ?', [cedula], (error, results) => {
      
          if (error) {
            console.error('Error en la consulta:', error);
            // Puedes agregar código para manejar el error aquí
          } else {
            if (results.length > 0) {
              const idSocio = results[0].idSocio;
      
              // Luego de obtener idSocio, puedes realizar la inserción en la tabla 'cuentaahorros'
              conection.query('INSERT INTO cuentaahorros SET ?', {
                cuentaSocio: idSocio,
                saldo: monto,
                fechaCreacion: fechaActual,
                estado: "Activo"
              }, (error, results) => {
                if (error) {
                  console.error(error);
                } else {
                  // Verifica si el usuario está autenticado
                  
                  const loggedIn = req.session.loggedin || false;
                  if (loggedIn) {
                    const username = req.session.name ? req.session.name.loginUsuarios : '';
                    res.render('mant-ahorros.ejs', {
                      usuarios: results, // Pasa los usuarios a la plantilla
                      username: username,
                      login: loggedIn,
                      ruta: 'mantenimiento-ahorros'
                    },                     console.log(results));
                  } else {
                    res.render('login.ejs', {
                      // Puedes agregar datos adicionales que necesites en la página de inicio de sesión
                    });
                  }
                }
              }); // Cierre de la segunda consulta
            } else {
              console.log('No se encontraron socios con esa cédula.');
              // Manejo adicional para el caso en el que no se encuentre un socio con la cédula
            }
          }
        }); // Cierre de la primera consulta
      };





      