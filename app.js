//Requerir el dotenv
require("dotenv").config();

// Importar API del .env
const apiKey = process.env.API_KEY;
// Puerto a usar por la página
const port = process.env.PORT;

// Inicializar el servidor
const express = require('express');
const app = express();
const filmRouter = require('./routes/routes');

// Definimos como motor de vistas el PUG, así como la carpeta con los archivos que se van a utilizar.
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static("./public"));

// Habilitamos la recepción de datos en formato JSON en una request.
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

// RUTAS
app.use("/", filmRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})