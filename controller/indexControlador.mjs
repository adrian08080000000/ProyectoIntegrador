export const rutaIndex= {}


rutaIndex.index = (req, res) => {
  
    if (req.session.loggedin) {
      const login = req.session.loggedin;
      const username = req.session.name ? req.session.name.loginUsuarios : '';
        
          res.render('/', {
          
            username: username,
            login: login
          });
      
      
  
    } else {
      res.redirect('/login');
  
    }
  };