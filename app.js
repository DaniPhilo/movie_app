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



app.use("/",filmRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})