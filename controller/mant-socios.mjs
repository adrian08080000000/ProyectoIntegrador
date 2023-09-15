import { conection } from '../database/db.mjs';
export const rutaMantSocios = {};

//Mostrar una lista de 6 socios solo activos
rutaMantSocios.mant_Socios = (req, res) => {
  try {
    const login = req.session.loggedin;
    const username = req.session.name ? req.session.name.loginUsuarios : '';

    conection.query('SELECT * FROM socios WHERE activo_inactivo = "Activo" LIMIT 6', (error, export_info) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
      } else {
        res.render('Mant-socios.ejs', {
          data: export_info,
          login: login,
          name: username
        });
      }
    });
  } catch (error) {
    console.error('Error al obtener la conexión:', error);
    res.status(500).send('Error interno del servidor');
  }
};



//Poner soico inactivo
rutaMantSocios.socio_inactivo = (req, res) => {
  try {

    const { id } = req.params;

    conection.query('UPDATE socios SET activo_inactivo = "Inactivo" WHERE idSocio = ?', [id], (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
      } else {
        res.redirect('/mantenimiento-socios');
      }
    });
  } catch (error) {
    console.error('Error al obtener la conexión:', error);
    res.status(500).send('Error interno del servidor');
  }
};



rutaMantSocios.mostrar_socios_inactivos = (req, res) => {
  try {


    conection.query('SELECT * FROM socios WHERE activo_inactivo = "inactivo" LIMIT 6', (error, export_info) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
      } else {
        res.render('Mant-socios.ejs', { data: export_info });
      }
    });
  } catch (error) {
    console.error('Error al obtener la conexión:', error);
    res.status(500).send('Error interno del servidor');
  }
};








//Mostrar formulario crear socio
rutaMantSocios.formulario_crear_nuevo_Socios = (req, res) => {
  const login = req.session.loggedin;
  const username = req.session.name ? req.session.name.loginUsuarios : '';

  res.render('formulario-crear-socio.ejs', {
    login: login,
    name: username
  });
};



// rutaMantSocios.guardar_Socio = (req, res) => {
//   const data = req.body;

//   // Verificar si la cédula es un número entero válido
//   if (!esCedulaValida(data.cedulaSocio)) {
//     return res.status(400).send('La cédula no es válida. Debe ser un número entero.');
//   }

//   conection.query('SELECT * FROM socios WHERE cedulaSocio = ?', [data.cedulaSocio], async (error, existingSocios) => {
//     if (error) {
//       console.error('Error al consultar la base de datos:', error);
//       res.status(500).send('Error interno del servidor');
//     } else {
//       try {
//         if (existingSocios.length > 0) {
//           res.redirect('/error-cedula-ya-existe');
//         } else {
//           conection.query('INSERT INTO socios SET ?', [data], (error, results) => {
//             if (error) {
//               console.error('Error al guardar el socio en la base de datos:', error);
//               res.status(500).send('Error interno del servidor');
//             } else {
//               res.redirect('/mantenimiento-socios');
//             }
//           });
//         }
//       } catch (error) {
//         console.error('Error al guardar el socio en la base de datos:', error);
//         res.status(500).send('Error interno del servidor');
//       }
//     }
//   });
// };




//Error la cedula ya existe
rutaMantSocios.error_cedula_ya_existe = async (req, res) => {
  try {
    res.render('error_la_cedula_esta_registrada.ejs');

  } catch (error) {
    console.error('Error al obtener la conexión o ejecutar la consulta:', error);
    res.status(500).send('Error interno del servidor');
  }
};




//Ver informacion completa del socio
rutaMantSocios.ver_info_completa_socio = (req, res) => {
  const login = req.session.loggedin;
  const username = req.session.name ? req.session.name.loginUsuarios : '';
  const { id } = req.params;

  conection.query('SELECT * FROM socios WHERE idSocio = ?', [id], (error, ver_info) => {
    if (error) {
      console.error('Error al obtener la conexión o ejecutar la consulta:', error);
      res.status(500).send('Error interno del servidor');
    } else {
      try {
        if (ver_info.length > 0) {
          res.render('informacion_completa_socio.ejs', { data: ver_info[0], login: login, name: username });
        } else {
          res.status(404).send('No se encontró información para el socio con el ID especificado.');
        }
      } catch (error) {
        console.error('Error al obtener la conexión o ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
      }
    }
  });
};



//Aqui se presentan los datos actuales del socio y para actualizar los que se quieran 
rutaMantSocios.ver_info_socio_a_editar = (req, res) => {
  try {
    const login = req.session.loggedin;
    const username = req.session.name ? req.session.name.loginUsuarios : '';
    const { id } = req.params;

    const sql = 'SELECT * FROM socios WHERE idSocio = ?';
    const values = [id];

    const connection = conection.getConnection();

    connection.query(sql, values, (error, editar_info) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
      } else {
        try {
          if (editar_info.length > 0) {
            res.render('editar_datos_socio.ejs', {
              data: editar_info[0],
              login: login,
              name: username
            });
          } else {
            res.status(404).send('No se encontró información para el socio con el ID especificado.');
          }
        } catch (error) {
          console.error('Error al obtener la conexión o ejecutar la consulta:', error);
          res.status(500).send('Error interno del servidor');
        }
      }

      connection.release();
    });
  } catch (error) {
    console.error('Error al obtener la conexión:', error);
    res.status(500).send('Error interno del servidor');
  }
};


//codigo encargado de actualizacion de socio
rutaMantSocios.actualizacion_datos_socio = (req, res) => {
  try {
    const { id } = req.params;
    const {
      idSocio, nombreSocio,
      apellidosSocio,
      activo_inactivo, socioTelefono,
      cedulaSocio, socioDireccion,
      socioCorreoElectronico,
      fechaNacimiento, sexo, estadoCivil, puestoTrabajo, nombreEmpresa,
      direccionEmpresa, gananciasMensual
    } = req.body;

    const sql = `
            UPDATE socios 
            SET idSocio = ?, nombreSocio = ?, apellidosSocio = ?, activo_inactivo =?, socioTelefono = ?, 
                cedulaSocio = ?, socioDireccion =?, socioCorreoElectronico =?, fechaNacimiento =?, sexo =?, 
                estadoCivil =?, puestoTrabajo= ?, nombreEmpresa =?, direccionEmpresa =?, gananciasMensual =? 
            WHERE idSocio = ?`;

    const values = [
      idSocio, nombreSocio, apellidosSocio, activo_inactivo, socioTelefono, cedulaSocio, socioDireccion,
      socioCorreoElectronico, fechaNacimiento, sexo, estadoCivil, puestoTrabajo, nombreEmpresa,
      direccionEmpresa, gananciasMensual, id
    ];

    const connection = conection.getConnection();

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
      } else {
        res.redirect('/mantenimiento-socios');
      }

      connection.release();
    });
  } catch (error) {
    console.error('Error al obtener la conexión:', error);
    res.status(500).send('Error interno del servidor');
  }
};

//Buscar socio por cedula y mostrar en la tabla
rutaMantSocios.buscar_por_cedula = (req, res) => {
  try {
    const login = req.session.loggedin;
    const username = req.session.name ? req.session.name.loginUsuarios : '';
    const { cedula_buscar } = req.body;

    const sql = 'SELECT * FROM Socios WHERE cedulaSocio = ?';
    const values = [cedula_buscar];

    conection.query(sql, values, (error, buscar_info) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
      } else {
        res.render('Mant-socios.ejs', {
          data: buscar_info,
          login: login,
          name: username
        });
      }
    });
  } catch (error) {
    console.error('Error al obtener la conexión:', error);
    res.status(500).send('Error interno del servidor');
  }
};



rutaMantSocios.guardar_Socio = (req, res) => {
  const nombre = req.body.nombreSocio;
  const apellido = req.body.apellidosSocio;
  const telefono = req.body.socioTelefono;
  const cedula = parseInt(req.body.cedulaSocio);
  const activo = req.body.activo_inactivo;
  const direccion = req.body.socioDireccion;
  const correo = req.body.socioCorreoElectronico;
  const fechaNac = req.body.fechaNacimiento;
  const sexo = req.body.sexo;
  const estadoCivil = req.body.estadoCivil;
  const puestoTrabajo = req.body.puestoTrabajo;
  const nombreEmpresaSocio = req.body.nombreEmpresa;
  const direccionEmpresaSocio = req.body.direccionEmpresa;
  const gananciaSocio = req.body.gananciasMensual;
  const fechaCrea = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const loggedIn = req.session.loggedin || false;
  if (loggedIn) {
    const username = req.session.name ? req.session.name.loginUsuarios : '';
    // Verifica si la cédula ya existe en la base de datos
    conection.query('SELECT COUNT(*) AS count FROM socios WHERE cedulaSocio = ?', [cedula], async (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
      } else {
        const cedulaExistente = results[0].count > 0;

        if (cedulaExistente) {
          res.render('formulario-crear-socio.ejs', {
            alert: true,
            alertTitle: 'Error',
            alertMenssage: 'Ya existe un socio con ese cedula.',
            alertIcon: 'error',
            showConfirmButton: true,
            timer: null,
            ruta: 'crear-nuevo-Socio',
            login: loggedIn,
            name: username
          });
        } else {
          conection.query(
            'INSERT INTO socios SET ?',
            {
              nombreSocio: nombre,
              cedulaSocio: cedula,
              fechaNacimiento: fechaNac,
              socioTelefono: telefono,
              sexo: sexo,
              activo_inactivo: activo,
              socioDireccion: direccion,
              socioCorreoElectronico: correo,
              estadoCivil: estadoCivil,
              puestoTrabajo: puestoTrabajo,
              nombreEmpresa: nombreEmpresaSocio,
              direccionEmpresa: direccionEmpresaSocio,
              gananciasMensual: gananciaSocio,
              apellidosSocio: apellido,
              socioFechaRegistro: fechaCrea
            },
            async (error, results) => {
              if (error) {
                console.log(error);
                res.status(500).send('Error interno del servidor');
              } else {
                res.render('Mant-socios.ejs', {
                  alert: true,
                  alertTitle: 'Registro',
                  alertMenssage: 'Se ha registrado exitosamente',
                  alertIcon: 'success',
                  showConfirmButton: false,
                  timer: 3000,
                  ruta: 'mantenimiento-socios',
                  login: loggedIn,
                  name: username
                });
              }
            }
          );
        }
      }
    });
  } else {
    // Debes manejar la lógica en caso de que el usuario no esté autenticado
    res.redirect('/login'); // Redirige a la página de inicio de sesión
  }
};



// export const buscarSoc = (req, res) => {
//   const cedula = req.body.cedula;
//   const username = req.session.name ? req.session.name.loginUsuarios : '';
//   // Realiza una consulta SQL para buscar el registro por cédula
//   conection.query('SELECT * FROM socios WHERE cedulaSocio = ?', [cedula], (error, results) => {
//     if (error) {
//       console.log(error);
//       // Maneja el error, por ejemplo, muestra un mensaje de error al usuario
//       res.render('Mant-socios.ejs', {
//         alert: true,
//         alertTitle: 'Error',
//         alertMenssage: 'Error al buscar el registro.',
//         alertIcon: 'error',
//         showConfirmButton: true,
//         timer: null,
//         ruta: 'mantenimiento-socios',
//         login: req.session.loggedin,
//         name: username
//       });
//     } else {
//       if (results.length > 0) {
//         // Si se encontró un registro, muestra sus datos en la página
//         const socio = results[0];
//         res.render('Mant-socios.ejs', {
//           alert: true,
//           alertTitle: 'Registro encontrado',
//           alertMenssage: 'Se encontró el registro con cédula ' + cedula,
//           alertIcon: 'success',
//           showConfirmButton: false,
//           timer: 3000,
//           ruta: 'mantenimiento-socios',
//           login: req.session.loggedin,
//           name: username,
//           socio: socio
//         });
//       } else {
//         // Si no se encontró ningún registro, muestra un mensaje de error
//         console.log('Consulta SQL:', 'SELECT * FROM socios WHERE cedulaSocio = ?', [cedula]);
//         res.render('Mant-socios.ejs', {
//           alert: true,
//           alertTitle: 'Registro no encontrado',
//           alertMenssage: 'No se encontró ningún registro con la cédula ' + cedula,
//           alertIcon: 'error',
//           showConfirmButton: true,
//           timer: null,
//           ruta: 'mantenimiento-socios',
//           login: req.session.loggedin,
//           name: username
//         });
//       }
//     }
//   });
// };






