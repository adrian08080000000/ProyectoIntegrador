export const rutasdeposito = {}
import { conection } from '../database/db.mjs';


rutasdeposito.CreacionDeposito = (req, res) => {
    if (req.session.loggedin) {
      const errorMensaje = '';
      const username = req.session.name ? req.session.name.loginUsuarios : '';
      conection.query('SELECT permisos FROM usuarios WHERE loginUsuarios= ?', [username], (error, results) => {
        if (error) {
          console.error('Error al obtener el permiso del usuario:', error);
        } else {
          // Supongamos que el permiso se encuentra en results[0].permisos
          const permisoUsuario = results[0].permisos;
  
          res.render('deposito-cuenta.ejs', { 
            username,
            error: errorMensaje,
            permisoUsuario: permisoUsuario
          });
        }
      });
    } else {
      res.redirect('/login');
    }
  };
  

  export const CrearDeposito = (req, res) => {
    const cuenta = req.body.cuenta;
    const tipo = "deposito";
    const monto = req.body.monto;
    const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
    const username = req.session.name ? req.session.name.loginUsuarios : '';
    conection.query('SELECT permisos FROM usuarios WHERE loginUsuarios= ?', [username], (error, results) => {
      if (error) {
        console.error('Error al obtener el permiso del usuario:', error);
      } else {
        const permisoUsuario = results[0].permisos;
  
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
                            const errorMensaje = '';
                            if (loggedIn) {
                              res.render('deposito-cuenta.ejs', {
                                permisoUsuario: permisoUsuario,
                                usuarios: insertResults,
                                username: username,
                                login: loggedIn,
                                alert: true,
                                alertTitle: 'Creación de Depósito',
                                alertMenssage: 'Depósito realizado exitosamente',
                                alertIcon: "success",
                                showConfirmButton: true,
                                timer: null,
                                ruta: 'realizar-deposito',
                                error: errorMensaje,
                              });
                            } else {
                              res.render('login.ejs', {});
                            }
                          }
                        });
                      }
                    });
                  } else {
                    const loggedIn = req.session.loggedin || false;
                    if (loggedIn) {
                      const errorMensaje = 'La cuenta de ahorro no tiene saldo';
                      const username = req.session.name ? req.session.name.loginUsuarios : '';
                      conection.query('SELECT permisos FROM usuarios WHERE loginUsuarios= ?', [username], (error, results) => {
                        if (error) {
                          console.error('Error al obtener el permiso del usuario:', error);
                        } else {
                          const permisoUsuario = results[0].permisos;
                          res.render('deposito-cuenta.ejs', {
                            username,
                            error: errorMensaje,
                            permisoUsuario: permisoUsuario
                          });
                        }
                      });
                    } else {
                      res.redirect('/login');
                    }
                  }
                }
              });
            } else {
              const loggedIn = req.session.loggedin || false;
              if (loggedIn) {
                const errorMensaje = 'La cuenta de ahorros no existe.';
                const username = req.session.name ? req.session.name.loginUsuarios : '';
                conection.query('SELECT permisos FROM usuarios WHERE loginUsuarios= ?', [username], (error, results) => {
                  if (error) {
                    console.error('Error al obtener el permiso del usuario:', error);
                  } else {
                    // Supongamos que el permiso se encuentra en results[0].permisos
                    const permisoUsuario = results[0].permisos;
                    res.render('deposito-cuenta.ejs', {
                      username,
                      error: errorMensaje,
                      permisoUsuario: permisoUsuario
                    });
                  }
                });
              } else {
                res.redirect('/login');
              }
            }
          }
        });
      }
    });
  };
  
  