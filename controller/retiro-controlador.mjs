export const rutasretiro = {}
import { conection } from '../database/db.mjs';




rutasretiro.CreacionRetiro = (req, res) => {
    if (req.session.loggedin) {
        const username = req.session.name ? req.session.name.loginUsuarios : '';
        const errorMensaje = '';
        res.render('retiro-cuenta.ejs', { username,error: errorMensaje  });
    } else {
        res.redirect('/login');

    }
}





export const CrearRetiro = (req, res) => {
    const cuenta = req.body.cuenta;
    const tipo = "retiro";
    const monto = req.body.monto;
    const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Consulta la base de datos para verificar si la cuenta existe
    conection.query('SELECT * FROM cuentaahorros WHERE idCuentaAhorros = ?', [cuenta], (error, cuentaResults) => {
        if (error) {
            console.error('Error en la consulta de cuentaahorros:', error);
        } else {
            if (cuentaResults.length > 0) {
                // La cuenta existe, obtenemos el saldo actual
                const saldoActual = cuentaResults[0].saldo;

                // Verifica si el saldo es suficiente para el retiro
                if (saldoActual >= parseFloat(monto)) {
                    const nuevoSaldo = saldoActual - parseFloat(monto);

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
                                        const errorMensaje = '';
                                        res.render('retiro-cuenta.ejs', {
                                            usuarios: insertResults,
                                            username: username,
                                            login: loggedIn,
                                            alert: true,
                                            alertTitle: 'Creación de Retiro',
                                            alertMenssage: 'Retiro realizado exitosamente',
                                            alertIcon: "success",
                                            showConfirmButton: true,
                                            timer: null,
                                            ruta: 'realizar-retiro',
                                            error: errorMensaje
                                        });
                                    } else {
                                        res.render('login.ejs', {});
                                    }
                                }
                            });
                        }
                    });
                } else {
                    // El saldo no es suficiente para el retiro
                    const errorMensaje = 'Saldo insuficiente para realizar el retiro.';
                    const username = req.session.name ? req.session.name.loginUsuarios : '';
                    res.render('retiro-cuenta.ejs', { username, error: errorMensaje });
                }
            } else {
                const errorMensaje = 'La cuenta de ahorros no existe.';
                const username = req.session.name ? req.session.name.loginUsuarios : '';
                res.render('retiro-cuenta.ejs', { username, error: errorMensaje });
            }
        }
    });
};




// export const CrearRetiro = (req, res) => {
//     const cuenta = req.body.cuenta;
//     const tipo = "retiro";
//     const monto = req.body.monto;
//     const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');

//     // Consulta la base de datos para verificar si la cuenta existe
//     conection.query('SELECT * FROM cuentaahorros WHERE idCuentaAhorros = ?', [cuenta], (error, cuentaResults) => {
//         if (error) {
//             console.error('Error en la consulta de cuentaahorros:', error);
//         } else {
//             if (cuentaResults.length > 0) {
//                 // La cuenta existe, obtenemos el saldo actual
//                 conection.query('SELECT saldo FROM cuentaahorros WHERE idCuentaAhorros = ?', [cuenta], (error, saldoResults) => {
//                     if (error) {
//                         console.error('Error en la consulta de cuentaahorros:', error);
//                     } else {
//                         if (saldoResults.length > 0) {
//                             const saldoActual = saldoResults[0].saldo;
//                             const nuevoSaldo = saldoActual - parseFloat(monto);

//                             // Actualiza el saldo en la tabla
//                             conection.query('UPDATE cuentaahorros SET saldo = ? WHERE idCuentaAhorros = ?', [nuevoSaldo, cuenta], (error, updateResults) => {
//                                 if (error) {
//                                     console.error('Error al actualizar el saldo:', error);
//                                 } else {
//                                     // Después de actualizar el saldo, inserta la transacción en la tabla 'transacciones'
//                                     conection.query('INSERT INTO transacciones SET ?', {
//                                         idCuentaAhorros: cuenta,
//                                         tipoTransaccion: tipo,
//                                         monto: monto,
//                                         transaccionFecHor: fechaActual,
//                                     }, (error, insertResults) => {
//                                         if (error) {
//                                             console.error('Error al insertar la transacción:', error);
//                                         } else {
//                                             const loggedIn = req.session.loggedin || false;
//                                             if (loggedIn) {
//                                                 const username = req.session.name ? req.session.name.loginUsuarios : '';
//                                                 res.render('retiro-cuenta.ejs', {
//                                                     usuarios: insertResults,
//                                                     username: username,
//                                                     login: loggedIn,
//                                                     alert: true,
//                                                     alertTitle: 'Creación de Depósito',
//                                                     alertMenssage: 'Depósito realizado exitosamente',
//                                                     alertIcon: "success",
//                                                     showConfirmButton: true,
//                                                     timer: null,
//                                                     ruta: 'realizar-retiro'
//                                                 });
//                                             } else {
//                                                 res.render('login.ejs', {});
//                                             }
//                                         }
//                                     });
//                                 }
//                             });
//                         } else {
//                             console.log('No se encontró saldo para la cuenta de ahorros.');
//                         }
//                     }
//                 });
//             } else {
//                 (req.session.loggedin)
//                     const errorMensaje = 'La cuenta de ahorros no existe.';
//                     const username = req.session.name ? req.session.name.loginUsuarios : '';
//                 res.render('retiro-cuenta.ejs', { username,error: errorMensaje });
//             }
//         }
//     });
// };