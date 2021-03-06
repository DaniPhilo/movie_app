// Requerir el dotenv
require("dotenv").config();

// Requiere librería para manejar cookies:
const cookieParser = require('cookie-parser');

// Requiere la función que inicia la conexión con PostgreSQL:
const { connectSQL } = require('./config/sql_connection');
const connectMongoDb = require('./config/mongodb_connection');

// Requerir errores personalizados:
const { NotFoundError, BadRequest, AuthenticationError } = require('./errors/errors.js');


// Inicializar el servidor
const express = require('express');
const path = require('path')
const session = require('express-session');
const passport = require('passport');

// Importar rutas:
const filmRouter = require('./routes/routes');
const app = express();

// Puerto a usar por la página
const port = process.env.PORT || 3000

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use("/", filmRouter);

// Error handlers
app.use((error, req, res, next) => {
    if (error.status === 400 && error.type === 'signup') {
        console.log(`Error from error handler in server: ${error.status} ${error.name}: ${error.type} -- ${error.message}`)
        return res.status(400).render('index', {action: 'signup', error: error})
    }
    else if (error.status === 400 && error.type === 'recovery') {
        console.log(`Error from error handler in server: ${error.status} ${error.name}: ${error.type} -- ${error.message}`)
        return res.status(400).render('restore_password', {error: error})
    }
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status === 401) {
    
        console.log(`Error from error handler in server: ${error.status} ${error.name} -- ${error.message}`)
        return res.render('index', {action: 'login', error: error})
    }
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status === 403) {
    
        console.log(`Error from error handler in server: ${error.status} ${error.name} -- ${error.message}`)
        return res.render('index', {action: 'login', error: error})
    }
    next(error)
})

app.use((req, res, next) => {
    res.status(404).render('error');
})

// Función que prueba la conexión a PostgreSQL antes de iniciar el servidor:
const init = async () => {
    try {
        await connectSQL();
        await connectMongoDb();
        app.listen(port, () => {
            console.log(`App listening on port ${port}...`);
        })
    }
    catch (error) {
        console.log(error);
    }
}

init();