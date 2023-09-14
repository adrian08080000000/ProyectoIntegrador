import bcryptjs from 'bcryptjs';
import { conection } from '../database/db.mjs';


export const rutaMantEmpleados = {};

rutaMantEmpleados.mantEmpl = (req, res) => {
  if (req.session.loggedin) {
    const username = req.session.name ? req.session.name.loginUsuarios : '';
    conection.query('SELECT permisos FROM usuarios WHERE loginUsuarios= ?', [username], (error, results) => {
      if (error) {
        console.error('Error al obtener el permiso del usuario:', error);
      } else {
        // Supongamos que el permiso se encuentra en results[0].permisos
        const permisoUsuario = results[0].permisos;

        conection.query('SELECT * FROM Usuarios', (error, results) => {
          if (error) {
            console.error('Error al obtener datos de Usuarios:', error);
            res.status(500).send('Error interno del servidor');
          } else {
            res.render('mant-empleados.ejs', { 
              usuarios: results,
              username,
              permisoUsuario: permisoUsuario
            });
          }
        });
      }
    });
  } else {
    res.redirect('/login');
  }
};


export const registroEmpleados = async (req, res) => {
  const nombre = req.body.nombre;
  const user = req.body.nombreUsr;
  const permisos = req.body.permisos;
  const contraseña = req.body.contra;
  const confContraseña = req.body['conf-contra']; // Nombre del campo en el formulario
  const login = req.session.loggedin;

  // Validar que la contraseña cumple con los requisitos
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!regex.test(contraseña)) {
    if (req.session.loggedin) {
      const username = req.session.name ? req.session.name.loginUsuarios : '';
      conection.query('SELECT permisos FROM usuarios WHERE loginUsuarios= ?', [username], (error, results) => {
        if (error) {
          console.error('Error al obtener el permiso del usuario:', error);
        } else {
          // Supongamos que el permiso se encuentra en results[0].permisos
          const permisoUsuario = results[0].permisos;

          // Consulta la base de datos para obtener los usuarios
          conection.query('SELECT * FROM Usuarios', (error, results) => {
            if (error) {
              console.error('Error al obtener datos de Usuarios:', error);
              res.status(500).send('Error interno del servidor');
            } else {
              // Renderiza la plantilla con los datos de usuarios
              res.render('mant-empleados.ejs', {
                usuarios: results, // Pasa los usuarios a la plantilla
                username: username,
                login: login,
                alert: true,
                alertTitle: 'Error',
                alertMenssage: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un carácter especial y un número.',
                alertIcon: "error",
                showConfirmButton: true,
                timer: null,
                ruta: 'mantenimiento-empleados',
                permisoUsuario: permisoUsuario // Pasa permisoUsuario a la vista
                // ... Otras variables necesarias
              });
            }
          });
        }
      });
    } else {
      res.redirect('/login');
    }
  } else {
    // Verificar si las contraseñas son iguales
    if (contraseña !== confContraseña) {
      if (req.session.loggedin) {
        const username = req.session.name ? req.session.name.loginUsuarios : '';
        conection.query('SELECT permisos FROM usuarios WHERE loginUsuarios= ?', [username], (error, results) => {
          if (error) {
            console.error('Error al obtener el permiso del usuario:', error);
          } else {
            // Supongamos que el permiso se encuentra en results[0].permisos
            const permisoUsuario = results[0].permisos;

            // Consulta la base de datos para obtener los usuarios
            conection.query('SELECT * FROM Usuarios', (error, results) => {
              if (error) {
                console.error('Error al obtener datos de Usuarios:', error);
                res.status(500).send('Error interno del servidor');
              } else {
                // Renderiza la plantilla con los datos de usuarios
                res.render('mant-empleados.ejs', {
                  usuarios: results, // Pasa los usuarios a la plantilla
                  username: username,
                  login: login,
                  alert: true,
                  alertTitle: 'Error',
                  alertMenssage: 'Las contraseñas no coinciden',
                  alertIcon: "error",
                  showConfirmButton: true,
                  timer: null,
                  ruta: 'mantenimiento-empleados',
                  permisoUsuario: permisoUsuario // Pasa permisoUsuario a la vista
                  // ... Otras variables necesarias
                });
              }
            });
          }
        });
      } else {
        res.redirect('/login');
      }
    } else {
      // Si las contraseñas coinciden y cumplen con los requisitos, continuar con el registro
      let contraHash = await bcryptjs.hash(contraseña, 8);

      conection.query('INSERT INTO Usuarios SET ?', {
        loginUsuarios: nombre,
        nombreUsuarios: user,
        contraseñaUsuarios: contraHash,
        permisos: permisos
      }, async (error, results) => {
        if (error) {
          console.log(error);
        } else {
          if (req.session.loggedin) {
            const username = req.session.name ? req.session.name.loginUsuarios : '';
            conection.query('SELECT permisos FROM usuarios WHERE loginUsuarios= ?', [username], (error, results) => {
              if (error) {
                console.error('Error al obtener el permiso del usuario:', error);
              } else {
                // Supongamos que el permiso se encuentra en results[0].permisos

                // Consulta la base de datos para obtener los usuarios
                conection.query('SELECT * FROM Usuarios', (error, usuarios) => {
                  if (error) {
                    console.error('Error al obtener datos de Usuarios:', error);
                    res.status(500).send('Error interno del servidor');
                  } else {
                    // Renderiza la plantilla con los datos de usuarios
                    res.render('mant-empleados.ejs', {
                      usuarios: usuarios, // Pasa los usuarios a la plantilla
                      username: username,
                      alert: true,
                      alertTitle: 'Registro',
                      alertMenssage: 'Se ha registrado exitosamente',
                      alertIcon: "success",
                      showConfirmButton: false,
                      timer: 3000,
                      ruta: 'mantenimiento-empleados',
                      permisoUsuario: permisoUsuario // Pasa permisoUsuario a la vista
                      // ... Otras variables necesarias
                    });
                  }
                });
              }
            });
          }
        }
      });
    }
  }
};



export const eliminarUsuario = (userId) => {
  return new Promise((resolve, reject) => {
    conection.query('DELETE FROM Usuarios WHERE id = ?', [userId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};



export const editEmp= (req, res) => {
  const id = req.params.id;
  const { nuevoNombre, nuevoLogin, nuevoPermisos } = req.body; // Ajusta esto según los campos que quieras editar

  conection.query(
    'UPDATE Usuarios SET nombreUsuarios = ?, loginUsuarios = ?, permisos = ? WHERE id = ?',
    [nuevoNombre, nuevoLogin, nuevoPermisos, id],
    (error, results) => {
      if (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).send('Error interno del servidor');
      } else {
        res.redirect('/a');
      }
    }
  );
};