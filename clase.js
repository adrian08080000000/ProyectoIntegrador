// Definimos una función constructora
/*controller = {}

function Persona(entrada) {
    this.entrada = entrada;
    
  }
  
  // Agregamos métodos a la clase usando el prototipo
  Persona.prototype.saludar = function() {


    controller.list = (req, res)=>{
        req.getConnection((err, conn)=>{
          conn.query(entradada, (err, customer)=>{
             if(err){
                 res.json(err);
             }
             res.render('customers', {data: customer});
          });
        });
     };


  };
  
  // Crear una instancia de la clase Persona
  const persona2 = new Persona('select * from socios');
  
  // Utilizar el método saludar de la clase Persona
 // persona2.saludar();


 persona2 


controller.list = (req, res)=>{
    res.persona2.saludar();
 };

 persona2.list()


 
module.exports = controller;
*/







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

  const persona = new Operaciones();

  persona.list('select * from socios');
  persona.save('insert into socios set ?');
  persona.delet('delete from socios where id_cedula =  ?');
  persona.edit('select * from socios where id_cedula = ?');
  persona.update('UPDATE socios set ? where id_cedula = ?');
  
  module.exports =  persona;
  




/*
class Persona {
    constructor(nombre, edad) {
      this.nombre = nombre;
      this.edad = edad;
    }
  
    saludar() {
      console.log(`Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años.`);
    }
  }
  
  // Crear instancias de la clase Persona
   constroller.Persona('Juan', 30);
  const persona2 = new Persona('María', 25);
  
  // Utilizar el método saludar de la clase Persona
  persona1.saludar();
  persona2.saludar();*/
  