import bcryptjs from 'bcryptjs';
import {conection} from '../database/db.mjs';

export const rutasregistro={}

rutasregistro.registro=(req,res) =>{
    res.render('rp.ejs')
  };
  


export const registroControlador = ('/rp', async (req,res)=>{
    const user = req.body.nombre;
    const nombre = req.body.nc;
    const permisos = req.body.permisos;
    const contraseña = req.body.contra;

    let contraHash = await bcryptjs.hash(contraseña,8);
    conection.query('Insert INTO Usuarios SET ?',{
        loginUsuarios:user,
        nombreUsuarios:nombre,
        contraseñaUsuarios:contraHash,
        permisos:permisos
    },async(error , results ) => {
        if(error){
            console.log(error)
        }
        else{
            res.render('rp.ejs',{
                alert : true,
                alertTitle : 'Registro',
                alertMenssage : 'Se ha registrado exitosamente',
                alertIcon: "success",
                showConfirmButton : false,
                timer: 3000,
                ruta:''
            })
        }
    }
    
)});
