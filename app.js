//Requerir el dotenv
require("dotenv").config();

// Importar API del .env
const apiKey = process.env.API_KEY;
// Puerto a usar por la página
const port = process.env.PORT;

// Requiere la función que inicia la conexión con PostgreSQL:
const { connectSQL } = require('./db/sql_connection');

// Requerir errores personalizados:
const { NotFoundError, BadRequest, AuthenticationError } = require('./errors/errors.js')

// Inicializar el servidor
const express = require('express');
const app = express();
const filmRouter = require('./routes/routes');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/", filmRouter);

app.use((error, req, res, next) => {
    if (error.status === 400) {
        console.log('Error entered error handler in server (status 400)')
        return res.render('index', {action: 'signup', error: error.message})
    }
})

// Función que prueba la conexión a PostgreSQL antes de iniciar el servidor:
const init = async () => {
    try {
        await connectSQL();
        app.listen(port, () => {
            console.log(`App listening on port ${port}...`);
        })
    }
    catch (error) {
        console.log(error);
    }
}

init();