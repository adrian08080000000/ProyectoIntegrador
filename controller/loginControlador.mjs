import bcryptjs from 'bcryptjs';
import {conection} from '../database/db.mjs';
import session from 'express-session';

export const rutasLogin = {}
//Controlador del login 

rutasLogin.login =(req,res) =>{
    res.render('login.ejs')
};

//autenticacion 

export const sesion=session({
  secret: '12345',
  resave:true,
  saveUninitialized:false
  });

export const autLogin=async(req,res)=>{
    const userName = req.body.userName;
    const contra = req.body.contra;
    let contraHaash = await bcryptjs.hash(contra , 8);
    
    conection.query('SELECT * FROM Usuarios WHERE loginUsuarios = ?', [userName], async (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
          return;
        }
      
        if (!results || results.length === 0) {
          res.render('login.ejs', {
            alert:true,
            alertTitle : "Error",
            alertMenssage: "Usuario y/o Contraseña incorrectas",
            shodowConfirmButton: false,
            alertIcon: "error",
            showConfirmButton: true,
            timer : 1500,
            ruta: 'login'
          });
          
         
        } else {
          // Comparar la contraseña y manejar el caso aquí
          if (!await bcryptjs.compare(contra, results[0].contraseñaUsuarios)) {
            res.render('login.ejs', {
              alert:true,
              alertTitle : "Error",
              alertMenssage: "Usuario y/o Contraseña incorrectas",
              alertIcon: "error",
              showConfirmButton: true,
              timer : 1500,
              ruta: 'login'

            }
            );
          } else {
            req.session.name=results[0]
            req.session.loggedin = true;
            res.render('login.ejs', {
              alert:true,
              alertTitle : "Inicio de sesion",
              alertMenssage: "Inicio de sesion exitoso!",
              showConfirmButton: false,
              alertIcon: "success",
              ruta: '',
              timer :3000 

            });
            
          }
        }
      })
}

// Controlador de autenticación
export const Aut = (req, res, error, sesionCerrada = false) => {
  if (req.session.loggedin) {
    const username = req.session.name ? req.session.name.loginUsuarios : '';
    // Realiza una consulta para obtener el permiso del usuario desde la DB
    conection.query('SELECT permisos FROM usuarios WHERE loginUsuarios= ?', [username], (error, results) => {
        if (error) {
            console.error('Error al obtener el permiso del usuario:', error);
        } else {
            // Supongamos que el permiso se encuentra en results[0].permisos
            const permisoUsuario = results[0].permisos;
            res.render('index.ejs', {
              login: true,
              name: username,
              error: error,
              sesionCerrada: sesionCerrada,
              permisoUsuario: permisoUsuario // Pasa permisoUsuario a la vista
            });
        }
    });
  } else {
    res.render('login.ejs', {
      error: error,
      sesionCerrada: sesionCerrada
    });
  }
};

// export const Aut = (req, res, error, sesionCerrada = false) => {
//   if (req.session.loggedin) {
//     const username = req.session.name ? req.session.name.loginUsuarios : '';
//     res.render('index.ejs', {
//       login: true,
//       name: username,
//       error: error,
//       sesionCerrada: sesionCerrada // Pasa sesionCerrada a la vista
//     });
//   } else {
//     res.render('login.ejs', {
//       error: error,
//       sesionCerrada: sesionCerrada // Pasa sesionCerrada a la vista
//     });
//   }
// };
// controlador de cierre de session 

export const logAut=(req,res)=>{
  req.session.destroy(()=>{
    res.redirect('/login')
  })
}

export function autSesion(req, res, next) {
  if (req.session && req.session.usuario) {
      // Si existe una sesión de usuario, el usuario está autenticado
      next();
  } else {
      // Si no hay sesión de usuario, redirige al usuario a la página de inicio de sesión
      res.redirect('/login');
  }
}
export const sesionExp = (req, res) => {
  const mensajeDeError = 'Ha ocurrido un error. Por favor, inicia sesión nuevamente.';
  Aut(req, res, mensajeDeError);
};

export const cerrarsesion = ('/cerrar-sesion', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar la sesión:', err);
      res.redirect('/');
    } else {
      // Redirige a la página de inicio con un parámetro en la URL
      res.redirect('/?sesionCerrada=true');
    }
  });
});

