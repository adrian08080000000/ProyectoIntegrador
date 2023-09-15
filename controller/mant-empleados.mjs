import bcryptjs from 'bcryptjs';
import { conection } from '../database/db.mjs';



export const rutaMantEmpleados = {};

rutaMantEmpleados.mantEmpl = (req, res) => {

  if (req.session.loggedin) {
    const login = req.session.loggedin;
    const username = req.session.name ? req.session.name.loginUsuarios : '';
    conection.query('SELECT * FROM Usuarios', (error, results) => {
      if (error) {
        console.error('Error al obtener datos de Usuarios:', error);
        res.status(500).send('Error interno del servidor');
      } else {

        res.render('mant-empleados.ejs', {
          usuarios: results,
          username: username,
          login: login
        });
      }
    });

  } else {
    res.redirect('/login');

  }
};

rutaMantEmpleados.editarEmp = (req, res) => {

  if (req.session.loggedin) {    // Obtén el ID del usuario de los parámetros de la URL
    const idUsuario = req.params.id;
    const login = req.session.loggedin;
    const username = req.session.name ? req.session.name.loginUsuarios : '';


    res.render('editarEmpleado.ejs', {
      username: username,
      login: login,
      idUsuario: idUsuario

    });
  } else {

    res.redirect('/login'); // Redirige a la página de inicio de sesión u otra página adecuada
  }
}

export const registroEmpleados = async (req, res) => {
  const nombre = req.body.nombre;
  const user = req.body.login;
  const contraseña = req.body.contra;
  const permisos = req.body.permisos;
  const confContraseña = req.body.confcontra; // Nombre del campo en el formulario

  if (contraseña !== confContraseña) {
    console.log(contraseña, confContraseña);
    const username = req.session.name ? req.session.name.loginUsuarios : '';
    const login = req.session.loggedin;
    conection.query('SELECT * FROM Usuarios', (error, results) => {
      if (error) {
        console.error('Error al obtener datos de Usuarios:', error);
        res.status(500).send('Error interno del servidor');
      } else {
        res.render('mant-empleados.ejs', {
          usuarios: results,
          username: username,
          login: login,
          alert: true,
          alertTitle: 'Error',
          alertMenssage: 'Errores, contraseñas no coinciden.',
          alertIcon: "error",
          showConfirmButton: true,
          timer: null,
          ruta: 'mantenimiento-empleados'
        });
      }
    });
  } else {
    conection.query('SELECT * FROM Usuarios WHERE loginUsuarios = ?', [user], (error, existingUser) => {
      if (error) {
        console.error('Error al verificar si el usuario existe:', error);
        res.status(500).send('Error interno del servidor');
      } else if (existingUser.length > 0) {
        // El usuario ya existe en la base de datos
        const username = req.session.name ? req.session.name.loginUsuarios : '';
        const login = req.session.loggedin;
        const errorMessage = 'El nombre de usuario ya está en uso. Por favor, elige otro.';
        conection.query('SELECT * FROM Usuarios', (error, usuarios) => {
          if (error) {
            console.error('Error al obtener datos de Usuarios:', error);
            res.status(500).send('Error interno del servidor');
          } else {
            // Renderiza la plantilla con los datos de usuarios
            res.render('mant-empleados.ejs', {
              usuarios: usuarios,
              username: username,
              login: login,
              alert: true,
              alertTitle: 'Error',
              alertMenssage: errorMessage,
              alertIcon: "error",
              showConfirmButton: true,
              timer: null,
              ruta: 'mantenimiento-empleados'
            });
          }
        });
      } else {
        // El usuario no existe y las contraseñas coinciden, entonces procedemos a registrar al empleado
        conection.query('INSERT INTO Usuarios ( loginUsuarios, nombreUsuarios, contraseñaUsuarios, permisos) VALUES (?, ?, ?, ?)', [nombre, user,  contraseña,permisos], (error, result) => {
          if (error) {
            console.error('Error al insertar el nuevo empleado en la base de datos:', error);
            res.status(500).send('Error interno del servidor');
          } else {
            const username = req.session.name ? req.session.name.loginUsuarios : '';
            const login = req.session.loggedin;
            conection.query('SELECT * FROM Usuarios', (error, usuarios) => {
              if (error) {
                console.error('Error al obtener datos de Usuarios:', error);
                res.status(500).send('Error interno del servidor');
              } else {
                // Renderiza la plantilla con los datos de usuarios
                res.render('mant-empleados.ejs', {
                  usuarios: usuarios, // Pasa los usuarios a la plantilla
                  username: username,
                  login: login,
                  alert: true,
                  alertTitle: 'Registro',
                  alertMenssage: 'Se ha registrado exitosamente',
                  alertIcon: "success",
                  showConfirmButton: false,
                  timer: 3000,
                  ruta: 'mantenimiento-empleados'
                  // ... Otras variables necesarias
                });
              }
            });
          }
        });
      }
    });
  }
}

      
      



      rutaMantEmpleados.confirEditEmp = ((req, res) => {

        const { id, name, nombre, permisos, contra, 'conf-contra': confContra } = req.body;
        console.log(req.body.idUsuario)
        // Consulta SQL para actualizar un empleado
        const sql = `
    UPDATE Usuarios
    SET loginUsuarios = ? , nombreUsuarios = ?,  permisos = ? , contraseñaUsuarios =?
    WHERE idUsuarios = ?
  `;

        // Parámetros para la consulta SQL
        const params = [name, nombre, permisos, contra, id];
        console.log(params)
        conection.query(sql, params, (error, results) => {
          if (error) {
            console.error('Error al actualizar el empleado:', error);
            return res.status(500).send('Error al actualizar el empleado');
          }


          res.redirect('/mantenimiento-empleados'); // Redirige a la página de mantenimiento de empleados o a donde necesites
        });

      })

      rutaMantEmpleados.eliminarUsuario = async (req, res) => {
        const idUsuario = req.params.id; // Obtiene el ID del usuario desde los parámetros de la URL

        // Consulta SQL para eliminar el usuario por su ID
        const sql = `DELETE FROM Usuarios WHERE idUsuarios = ?`;

        conection.query(sql, [idUsuario], (err, result) => {
          if (err) {
            console.error('Error al eliminar usuario:', err);
            // Maneja los errores adecuadamente, por ejemplo, redirigiendo a una página de error
            res.redirect('/error');
            return;
          }

          res.redirect('/mantenimiento-empleados');
        });
      };


      rutaMantEmpleados.mostrarDetallesEliminarUsuario = (req, res) => {
        const idUsuario = req.params.id; // Obtiene el ID del usuario de los parámetros de la URL


        res.render('eliminar-usuario', { idUsuario });
      };












