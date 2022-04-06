require('dotenv').config();
const fetch = require('node-fetch');
const apiKey = process.env.API_KEY;


// Petición de vista general de todas las películas.
const getFilmsByTitle = async (title) => {
    try {
        let request = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${title}`); //{}
        let films = await request.json();
        return films.Search // En el array Search[] de la respuesta vienen los datos que necesitamos para pintarlos en la vista pertinente
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        return [];
    }
}

// Petición de la vista detallada de una de las películas
const getOneFilm = async (title) => {
    try {
        let response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`)
        let info = await response.json();
        return info
    } catch (error) {
        console.log(`ERROR: ${error.stack}`)
        return []
    }
}

// Exportamos las funciones
module.exports = {
    getFilmsByTitle,
    getOneFilm
}