

const controller = {};


//Mostrar el html con los datos
controller.list = (req, res)=>{
   req.getConnection((err, conn)=>{
     conn.query('select * from socios', (err, cuenta_adulto)=>{
        if(err){
            res.json(err);
        }
        res.render('cuentaAdultos/cuenta_adultos', {data: cuenta_adulto});
     });
   });
};
//Guardar los datos en la base de datos
controller.save = (req, res)=>{
  req.getConnection((err, conn)=>{
     const data = req.body;
    conn.query('insert into socios set ?', [data], (err, mienbros)=>{

     console.log(err);  
    res.redirect('/')
    })
  })
}
controller.list_mienbro_creado = (req, res)=>{
  req.getConnection((err, conn)=>{
    conn.query('select * from socios', (err, cuenta_adulto)=>{
       if(err){
           res.json(err);
       }
       res.render('cuentaAdultos/miembro_creado', {data: cuenta_adulto});
    });
  });
};


//Eliminar datos por cedula
controller.delete = (req, res)=>{
   req.getConnection((err, conn)=>{
      const {id} = req.params;
     conn.query('delete from socios where id_cedula =  ?', [id], (err, mienbro)=>{
     res.redirect('/editlist_miembro_creado')
     })
   })
}
controller.edit = (req, res)=>{
   req.getConnection((err, conn)=>{
      const {id} = req.params;

     conn.query('select * from socios where id_cedula = ?', [id], (err, mienbro)=>{
        if(err){
            res.json(err);
        }
        res.render('cuentaAdultos/miembro_actualizar', {data: mienbro[0]});
     });
   });
};
controller.update = (req, res)=>{
   req.getConnection((err, conn)=>{
   
    console.log(err)

      const {id} = req.params;
      const data = req.body;
      
     conn.query('UPDATE socios set ? where id_cedula = ?',[data, id], (err, mienbro)=>{
    /*console.log(mienbro)*/
     res.redirect('editlist_miembro_creado')
     })
   })
}

//De aqui para abajo esta el cogigo del formulario estudiantil





//Mostrar el html cuenta infantil
controller.create_cuenta_infantil = (req, res)=>{
  req.getConnection((err, conn)=>{
    conn.query('select * from socios', (err, cuenta_adulto)=>{
       if(err){
           res.json(err);
       }
       res.render('cuenta_ifantil', {data: cuenta_adulto});
    });
  });
};

//Mostrar el html cuenta estudiantil
controller.create_cuenta_estudiantil = (req, res)=>{
  req.getConnection((err, conn)=>{
    conn.query('select * from socios', (err, cuenta_adulto)=>{
       if(err){
           res.json(err);
       }
       res.render('cuenta_estudiantil', {data: cuenta_adulto});
    });
  });
};





module.exports = controller;



/*
class Operaciones {
   constructor(list,save,delet,edit,update,req, res) {
     this.list = list;
     this.save = save;

     this.delet = delet;

     this.edit = edit;
     this.update = update;
     this.req = req;
     this.res = res;
   }
 
   // Método para mostrar el HTML con los datos
   list() {
     this.req.getConnection((err, conn) => {
       conn.query(this.list, (err, customer) => {
         if (err) {
           this.res.json(err);
         }
         this.res.render('customers', { data: customer });
       });
     });
   }
 
   // Método para guardar los datos en la base de datos
   save(data) {
     this.req.getConnection((err, conn) => {
       conn.query(this.save, [data], (err, customer) => {
         console.log(customer);
         this.res.redirect('/');
       });
     });
   }
 
   // Método para eliminar datos por cedula
   delet(id) {
     this.req.getConnection((err, conn) => {
       conn.query(this.delete, [id], (err, customer) => {
         this.res.redirect('/');
       });
     });
   }
 
   // Método para editar datos
   edit(id) {
     this.req.getConnection((err, conn) => {
       conn.query(this.edit, [id], (err, customer) => {
         if (err) {
           this.res.json(err);
         }
         this.res.render('socios_actualizar', { data: customer[0] });
       });
     });
   }
 
   // Método para actualizar datos
   update(id, data) {
     this.req.getConnection((err, conn) => {
       conn.query(this.update, [data, id], (err, customer) => {
         this.res.redirect('/');
       });
     });
   }


 }

 const persona = new Operaciones('select * from socios','insert into socios set ?','delete from socios where id_cedula =  ?','select * from socios where id_cedula = ?','UPDATE socios set ? where id_cedula = ?');

 persona.list();
 persona.save();
 persona.delet();
 persona.edit();
 persona.update();
 
 module.exports =  persona;*/