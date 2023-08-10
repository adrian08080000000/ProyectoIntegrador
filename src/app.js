const express = require('express');
const path = require('path');
const morgan = require('morgan');
var mysql2 = require('mysql2');
const myConnection = require('express-myconnection');

const app = express();

// importing routes
const customerRoutes = require('./routes/rutas_cooperativa');

// settings
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


// middlewares

app.use(morgan('combined'));

app.use(myConnection(mysql2, {
    database: 'cooperativa2',
    host: 'localhost',
    user: 'root',
    port: 3306 
}, 'single'));

app.use(express.urlencoded({extended: false}));



// routes
app.use('/', customerRoutes);
//app.get('/add', customerRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciado en el puerto', app.get('port'))
})
