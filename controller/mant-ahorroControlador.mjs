export const rutasahorros = {}
import { conection } from '../database/db.mjs';


rutasahorros.ahorros = (req, res) => {
    if (req.session.loggedin) {
        const username = req.session.name ? req.session.name.loginUsuarios : ''; 
        conection.query('SELECT * FROM cuentaahorros', (error, results) => {
          if (error) {
            console.error('Error al obtener datos de Usuarios:', error);
            res.status(500).send('Error interno del servidor');
          } else {
            res.render('mant-ahorros.ejs', { usuarios: results, username });
          }
        });
    
      } else {
        res.redirect('/login');
    
      }
    };

rutasahorros.CreacionAhorro = (req, res) => {
    if (req.session.loggedin) {
        const username = req.session.name ? req.session.name.loginUsuarios : '';
        const errorMensaje = '';
        res.render('crea-Ahorro.ejs', { username,error: errorMensaje});
    } else {
        res.redirect('/login');

  }
}

export const CreaAhorro = (req, res) => {
    const cedula = req.body.cedula;
    const monto = req.body.monto;
    const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Consulta la base de datos para obtener los usuarios
    conection.query('SELECT idSocio FROM socios WHERE cedulaSocio = ?', [cedula], (error, results) => {

        if (error) {
            console.error('Error en la consulta:', error);
        } else {
            if (results.length > 0) {
                const idSocio = results[0].idSocio;
                conection.query('INSERT INTO cuentaahorros SET ?', {
                    cuentaSocio: idSocio,
                    saldo: monto,
                    fechaCreacion: fechaActual,
                    estado: "Activo"
                }, (error, results) => {
                    if (error) {
                        console.error(error);
                    } else {

                        const loggedIn = req.session.loggedin || false;
                        if (loggedIn) {
                            const username = req.session.name ? req.session.name.loginUsuarios : '';
                            res.render('crea-Ahorro.ejs', {
                                usuarios: results, // Pasa los usuarios a la plantilla
                                username: username,
                                login: loggedIn,
                                alert: true,
                                alertTitle: 'Creacion cuenta de Ahorro',
                                alertMenssage: 'Cuenta creada Exitosamente', 
                                alertIcon: "success", 
                                showConfirmButton: true,
                                timer: null,                               
                                ruta: 'mantenimiento-ahorros'
                            });
                        } else {
                            res.render('login.ejs', {
                            });
                        }
                    }
                });
            } else {
                const username = req.session.name ? req.session.name.loginUsuarios : '';
                const errorMensaje = 'No se encontraron socios con esa cédula.';
                res.render('crea-Ahorro.ejs', {
                    username,
                    error: errorMensaje,
                 }); 
            }
        }
    });
};