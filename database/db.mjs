import mysql from 'mysql';

import dotEnv from 'dotenv';
dotEnv.config({path: './env/.env'});

export const conection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
});
conection.connect((error)=>{
    if(error){
        console.log("Ocurrio un error "+ error);
        return;
    }
    else{
        console.log("Base de tados conectada exitosamente")
    }

})

