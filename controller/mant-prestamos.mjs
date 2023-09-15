import { conection } from '../database/db.mjs';



export const rutaMantPres = {};

rutaMantPres.crearPres = (req, res) => {
  
  if (req.session.loggedin) {
    const login = req.session.loggedin;
    const username = req.session.name ? req.session.name.loginUsuarios : '';
   

        res.render('mant-prestamos', {
         
          username: username,
          login: login
        });
      
    

  } else {
    res.redirect('/login');

  }
};

rutaMantPres.mantPres = (req, res) => {
  
  if (req.session.loggedin) {
    const login = req.session.loggedin;
    const username = req.session.name ? req.session.name.loginUsuarios : '';
    
        res.render('crear-prestamos', {
          usuarios: results,
          username: username,
          login: login
        });

    

  } else {
    res.redirect('/login');

  }
};
