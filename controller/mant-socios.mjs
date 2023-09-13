import {conection} from '../database/db.mjs';
export const rutaMantSocios = {};

//rutas
rutaMantSocios.mantSocios = (req, res) => {
    const login = req.session.loggedin;
    const username = req.session.name ? req.session.name.loginUsuarios : ''; 
    
    res.render('Mant-socios.ejs', { 
        login: login, 
        name: username
    });
};

rutaMantSocios.mantSociosCreacion= (req, res) => {
    const login = req.session.loggedin;
    const username = req.session.name ? req.session.name.loginUsuarios : ''; 
    
    res.render('mantSociosCreacion.ejs', { 
        login: login, 
        name: username
    });
};

export const creSoc = ('/socios-creacion', (req, res) => {
  const nombre = req.body.nombreSocio;
  const apellido = req.body.apellidoSocio;
  const cedula = req.body.cedulaSocio;
  const fechaNac = req.body.fecNacSocio;
  const sexo = req.body.sexo;
  const estadoCivil = req.body.estadoCivilSocio;
  const puestoTrabajo = req.body.puestoTrabajo;
  const nombreEmpresaSocio = req.body.nombreEmpresaSocio;
  const direccionEmpresaSocio = req.body.direccionEmpresaSocio;
  const gananciaSocio = req.body.gananciaSocio;
  const username = req.session.name ? req.session.name.loginUsuarios : '';
  // Verifica si algún campo está vacío
  if (!nombre || !apellido || !cedula || !fechaNac || !sexo || !estadoCivil || !puestoTrabajo || !nombreEmpresaSocio || !direccionEmpresaSocio || !gananciaSocio) {
      res.render('mantSociosCreacion.ejs', {
          alert: true,
          alertTitle: 'Error',
          alertMenssage: 'Por favor, completa todos los campos.',
          alertIcon: 'error',
          showConfirmButton: true,
          timer: null,
          ruta: 'socios-creacion',
          login: req.session.loggedin, 
          name: username
      });
  } else {
      // Verifica si la cédula ya existe en la base de datos
      conection.query('SELECT COUNT(*) AS count FROM socios WHERE cedulaSocio = ?', [cedula], async (error, results) => {
          if (error) {
              console.log(error);
          } else {
              const cedulaExistente = results[0].count > 0;

              if (cedulaExistente) {
                  
                  res.render('mantSociosCreacion.ejs', {
                      alert: true,
                      alertTitle: 'Error',
                      alertMenssage: 'Ya existe un socio con ese cedula.',
                      alertIcon: 'error',
                      showConfirmButton: true,
                      timer: null,
                      ruta: 'socios-creacion',
                      login: req.session.loggedin, 
                      name: username
                  });
              } else {
               
                  conection.query(
                      'INSERT INTO socios SET ?',
                      {
                          nombreSocio: nombre,
                          cedulaSocio: cedula,
                          fechaNacimiento: fechaNac,
                          sexo: sexo,
                          estadoCivil: estadoCivil,
                          puestoTrabajo: puestoTrabajo,
                          nombreEmpresa: nombreEmpresaSocio,
                          direccionEmpresa: direccionEmpresaSocio,
                          gananciasMensual: gananciaSocio,
                          apellidosSocio: apellido
                      },
                      async (error, results) => {
                          if (error) {
                              console.log(error);
                          } else {
                              res.render('mantSociosCreacion.ejs', {
                                  alert: true,
                                  alertTitle: 'Registro',
                                  alertMenssage: 'Se ha registrado exitosamente',
                                  alertIcon: 'success',
                                  showConfirmButton: false,
                                  timer: 3000,
                                  ruta: 'socios-creacion',
                                  login: req.session.loggedin,
                                  name: username
                              });
                          }
                      }
                  );
              }
          }
      });
  }
});

export const buscarSoc = (req, res) => {
    const cedula = req.body.cedula;
    const username = req.session.name ? req.session.name.loginUsuarios : '';
    // Realiza una consulta SQL para buscar el registro por cédula
    conection.query('SELECT * FROM socios WHERE cedulaSocio = ?', [cedula], (error, results) => {
        if (error) {
            console.log(error);
            // Maneja el error, por ejemplo, muestra un mensaje de error al usuario
            res.render('Mant-socios.ejs', {
                alert: true,
                alertTitle: 'Error',
                alertMenssage: 'Error al buscar el registro.',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: null,
                ruta: 'mantenimiento-socios',
                login: req.session.loggedin,
                name: username
            });
        } else {
            if (results.length > 0) {
                // Si se encontró un registro, muestra sus datos en la página
                const socio = results[0];
                res.render('Mant-socios.ejs', {
                    alert: true,
                    alertTitle: 'Registro encontrado',
                    alertMenssage: 'Se encontró el registro con cédula ' + cedula,
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 3000,
                    ruta: 'mantenimiento-socios',
                    login: req.session.loggedin,
                    name: username,
                    socio: socio
                });
            } else {
                // Si no se encontró ningún registro, muestra un mensaje de error
                console.log('Consulta SQL:', 'SELECT * FROM socios WHERE cedulaSocio = ?', [cedula]);
                res.render('Mant-socios.ejs', {
                    alert: true,
                    alertTitle: 'Registro no encontrado',
                    alertMenssage: 'No se encontró ningún registro con la cédula ' + cedula,
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: null,
                    ruta: 'mantenimiento-socios',
                    login: req.session.loggedin,
                    name: username
                });
            }
        }
    });
};






