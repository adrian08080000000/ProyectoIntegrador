export const rutasdeposito = {}
import { conection } from '../database/db.mjs';


rutasdeposito.CreacionDeposito = (req, res) => {
    if (req.session.loggedin) {
        const username = req.session.name ? req.session.name.loginUsuarios : '';
        const errorMensaje = '';
        res.render('deposito-cuenta.ejs', { username,error: errorMensaje  });
    } else {
        res.redirect('/login');

    }
}

export const CrearDeposito = (req, res) => {
    const cuenta = req.body.cuenta;
    const tipo = "deposito";
    const monto = req.body.monto;
    const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Consulta la base de datos para verificar si la cuenta existe
    conection.query('SELECT * FROM cuentaahorros WHERE idCuentaAhorros = ?', [cuenta], (error, cuentaResults) => {
        if (error) {
            console.error('Error en la consulta de cuentaahorros:', error);
        } else {
            if (cuentaResults.length > 0) {
                // La cuenta existe, obtenemos el saldo actual
                conection.query('SELECT saldo FROM cuentaahorros WHERE idCuentaAhorros = ?', [cuenta], (error, saldoResults) => {
                    if (error) {
                        console.error('Error en la consulta de cuentaahorros:', error);
                    } else {
                        if (saldoResults.length > 0) {
                            const saldoActual = saldoResults[0].saldo;
                            const nuevoSaldo = saldoActual + parseFloat(monto);

                            // Actualiza el saldo en la tabla
                            conection.query('UPDATE cuentaahorros SET saldo = ? WHERE idCuentaAhorros = ?', [nuevoSaldo, cuenta], (error, updateResults) => {
                                if (error) {
                                    console.error('Error al actualizar el saldo:', error);
                                } else {
                                    // Después de actualizar el saldo, inserta la transacción en la tabla 'transacciones'
                                    conection.query('INSERT INTO transacciones SET ?', {
                                        idCuentaAhorros: cuenta,
                                        tipoTransaccion: tipo,
                                        monto: monto,
                                        transaccionFecHor: fechaActual,
                                    }, (error, insertResults) => {
                                        if (error) {
                                            console.error('Error al insertar la transacción:', error);
                                        } else {
                                            const loggedIn = req.session.loggedin || false;
                                            if (loggedIn) {
                                                const username = req.session.name ? req.session.name.loginUsuarios : '';
                                                res.render('deposito-cuenta.ejs', {
                                                    usuarios: insertResults,
                                                    username: username,
                                                    login: loggedIn,
                                                    alert: true,
                                                    alertTitle: 'Creación de Depósito',
                                                    alertMenssage: 'Depósito realizado exitosamente',
                                                    alertIcon: "success",
                                                    showConfirmButton: true,
                                                    timer: null,
                                                    ruta: 'realizar-deposito'
                                                });
                                            } else {
                                                res.render('login.ejs', {});
                                            }
                                        }
                                    });
                                }
                            });
                        } else {
                            console.log('No se encontró saldo para la cuenta de ahorros.');
                        }
                    }
                });
            } else {
                (req.session.loggedin)
                    const errorMensaje = 'La cuenta de ahorros no existe.';
                    const username = req.session.name ? req.session.name.loginUsuarios : '';
                res.render('deposito-cuenta.ejs', { username,error: errorMensaje });
            }
        }
    });
};





















// export const CrearDeposito = (req, res) => {
//     const cuenta = req.body.cuenta;
//     const tipo = req.body.tipo;
//     const monto = req.body.monto;
//     const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');

//     // Consulta la base de datos para obtener los usuarios
//     conection.query('SELECT cuentaSocio FROM cuentaahorros WHERE idCuentaAhorros = ?', [cuenta], (error, results) => {

//         if (error) {
//             console.error('Error en la consulta:', error);
//         } else {
//             if (results.length > 0) {
//                 const idCuentaAhorros = results[0].idCuentaAhorros;
//                 conection.query('INSERT INTO transacciones SET ?', {
//                     idCuentaAhorros: cuenta,
//                     tipoTransaccion: tipo,
//                     monto: monto,
//                     transaccionFecHor: fechaActual,
//                 }, (error, results) => {
//                     if (error) {
//                         console.error(error);
//                     } else {
//                         const loggedIn = req.session.loggedin || false;
//                         if (loggedIn) {
//                             const username = req.session.name ? req.session.name.loginUsuarios : '';
//                             res.render('deposito-cuenta.ejs', {
//                                 usuarios: results, // Pasa los usuarios a la plantilla
//                                 username: username,
//                                 login: loggedIn,
//                                 alert: true,
//                                 alertTitle: 'Creacion cuenta de Ahorro',
//                                 alertMenssage: 'Cuenta creada Exitosamente',
//                                 alertIcon: "success",
//                                 showConfirmButton: true,
//                                 timer: null,
//                                 ruta: 'mantenimiento-ahorros'
//                             });
//                         } else {
//                             res.render('login.ejs', {
//                             });
//                         }
//                     }
//                 });
//             } else {
//                 console.log('No se encontro esa cuenta de ahorros del socio.');
//             }
//         }
//     });
// };