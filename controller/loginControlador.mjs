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
export const Aut = (req, res) => {
  
  if (req.session.loggedin) {
    
    const username = req.session.name ? req.session.name.loginUsuarios : ''; 
    res.render('index.ejs', {
      login: true,
      name: username 
    });
  } else {
    res.redirect('/login')
  }
  
};
// controlador de cierre de session 

export const logAut=(req,res)=>{
  req.session.destroy(()=>{
    res.redirect('/login')
  })
}
