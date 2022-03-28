//Requerir el dotenv
require("dotenv").config();

// Importar API del .env
const apiKey = process.env.API_KEY;
// Puerto a usar por la página
const port = process.env.PORT;

// Requiere la función que inicia la conexión con PostgreSQL:
const { connectSQL } = require('./db/sql_connection');

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