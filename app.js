const apiKey = process.env.API_KEY;
const express = require('express');
const mongoose = require('mongoose');
const app = express()
const port = 3000
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/createMovie", (req,res)=>{
    res.render("createMovie")
})
const {createMovie, getMovies, getMovie, updateMovie, getMoviesDel, deleteMovie, getMovieDel} = require("./routes/movies.js")
app.post("/createMovie", createMovie)
app.get("/editMovie", getMovies)
app.get("/editMovie/:titulo", getMovie)
app.post("/editMovie/:titulo", updateMovie)
//app.get("/removeMovie", getMoviesDel)
app.get("/removeMovie/:titulo", getMovieDel)
app.post("/removeMovie/:titulo", deleteMovie)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
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