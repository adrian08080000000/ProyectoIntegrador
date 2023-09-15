export const rutaIndex= {}


rutaIndex.index= (req,res)=>{
        // Accede al userName almacenado en la sesión
        const userName = req.session.userName;
            // Realiza una consulta para obtener el permiso del usuario desde la DB
            conection.query('SELECT permisos FROM usuarios WHERE loginUsuarios= ?', [userName], (error, results) => {
                if (error) {
                    console.error('Error al obtener el permiso del usuario:', error);
                } else {
                    const permisoUsuario = results[0].permiso;
                    res.render('index.ejs', { permisoUsuario });
                }
              });
}